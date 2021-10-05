/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

package com.weaver.corda.app.interop.flows

import arrow.core.*
import co.paralleluniverse.fibers.Suspendable
import com.weaver.corda.app.interop.contracts.AssetExchangeHTLCStateContract
import com.weaver.corda.app.interop.states.AssetExchangeHTLCState
import com.weaver.corda.app.interop.states.AssetLockHTLCData
import com.weaver.corda.app.interop.states.AssetClaimHTLCData

import net.corda.core.contracts.ContractState
import net.corda.core.contracts.CommandData
import net.corda.core.contracts.Command
import net.corda.core.contracts.UniqueIdentifier
import net.corda.core.contracts.TimeWindow
import net.corda.core.contracts.StateAndRef
import net.corda.core.contracts.requireThat
import net.corda.core.contracts.StaticPointer

import net.corda.core.identity.Party

import net.corda.core.flows.*
import net.corda.core.node.services.queryBy
import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.node.ServiceHub
import net.corda.core.transactions.TransactionBuilder
import net.corda.core.transactions.SignedTransaction
import net.corda.core.utilities.OpaqueBytes
import java.time.Instant
import java.util.Base64

import com.weaver.protos.common.asset_locks.AssetLocks

    
/**
 * The LockAssetHTLCFlows flow is used to create a lock for an asset using HTLC.
 *
 * @property assetExchangeHTLCState The [AssetExchangeHTLCState] provided by the Corda client to create a lock.
 */

object LockAssetHTLC {
    @InitiatingFlow
    @StartableByRPC
    class Initiator(
            val lockInfo: AssetLocks.AssetLockHTLC,
            val assetStateRef: StateAndRef<ContractState>,
            val assetStateDeleteCommand: CommandData,
            val recipient: Party
    ) : FlowLogic<Either<Error, UniqueIdentifier>>() {
        /**
         * The call() method captures the logic to create a new [AssetExchangeHTLCState] state in the vault.
         *
         * It first creates a new AssetExchangeHTLCState. It then builds
         * and verifies the transaction, collects the required signatures,
         * and stores the state in the vault.
         *
         * @return Returns the linearId of the newly created [AssetExchangeHTLCState].
         */
        @Suspendable
        override fun call(): Either<Error, UniqueIdentifier> = try {            
            // 1. Create the HTLC State
            val expiryTime: Instant = when(lockInfo.timeSpec) {
                AssetLocks.AssetLockHTLC.TimeSpec.EPOCH -> Instant.ofEpochSecond(lockInfo.expiryTimeSecs)
                AssetLocks.AssetLockHTLC.TimeSpec.DURATION -> Instant.now().plusSeconds(lockInfo.expiryTimeSecs)
                else -> Instant.now().minusSeconds(10)
            }
            if (expiryTime.isBefore(Instant.now())) {
                Left(Error("Invalid Expiry Time or TimeSpec in lockInfo."))
            }
            val lockInfoData = AssetLockHTLCData(
                hash = OpaqueBytes(Base64.getDecoder().decode(lockInfo.hashBase64.toByteArray())),
                expiryTime = expiryTime
            )
            val assetExchangeHTLCState = AssetExchangeHTLCState(
                lockInfoData,
                StaticPointer(assetStateRef.ref, assetStateRef.state.data.javaClass), //Get the state pointer from StateAndRef
                ourIdentity,
                recipient
            )
        
            println("Creating Lock State ${assetExchangeHTLCState}")
            // 2. Build the transaction
            val notary = assetStateRef.state.notary
            val lockCmd = Command(AssetExchangeHTLCStateContract.Commands.Lock(), 
                listOf(
                    assetExchangeHTLCState.locker.owningKey, 
                    assetExchangeHTLCState.recipient.owningKey
                )
            )
            val assetDeleteCmd = Command(assetStateDeleteCommand, 
                listOf(
                    assetExchangeHTLCState.locker.owningKey
                )
            )
            val txBuilder = TransactionBuilder(notary)
                    .addInputState(assetStateRef)
                    .addOutputState(assetExchangeHTLCState, AssetExchangeHTLCStateContract.ID)
                    .addCommand(lockCmd)
                    .addCommand(assetDeleteCmd)

            // 3. Verify and collect signatures on the transaction
            txBuilder.verify(serviceHub)
            val partSignedTx = serviceHub.signInitialTransaction(txBuilder)
            println("Locker signed transaction.")
            
            val recipientSession = initiateFlow(recipient)
            val fullySignedTx = subFlow(CollectSignaturesFlow(partSignedTx, setOf(recipientSession)))
            val storedAssetExchangeHTLCState = subFlow(FinalityFlow(fullySignedTx, setOf(recipientSession))).tx.outputStates.first() as AssetExchangeHTLCState
            
            // 4. Return the linearId of the state
            println("Successfully stored: $storedAssetExchangeHTLCState\n")
            Right(storedAssetExchangeHTLCState.linearId)
        } catch (e: Exception) {
            println("Error locking asset: ${e.message}\n")
            Left(Error("Failed to lock asset: ${e.message}"))
        }
    }
    
    @InitiatedBy(Initiator::class)
    class Acceptor(val recipientSession: FlowSession) : FlowLogic<SignedTransaction>() {
        @Suspendable
        override fun call(): SignedTransaction {
            val signTransactionFlow = object : SignTransactionFlow(recipientSession) {
                override fun checkTransaction(stx: SignedTransaction) = requireThat {
                    "The output State must be AssetExchangeHTLCState" using (stx.tx.outputs.single().data is AssetExchangeHTLCState)
                    val htlcState = stx.tx.outputs.single().data as AssetExchangeHTLCState
                    "I must be the recipient" using (htlcState.recipient == ourIdentity)
                }
            }
            try {
                val txId = subFlow(signTransactionFlow).id
                println("Recipient signed transaction.")
                return subFlow(ReceiveFinalityFlow(recipientSession, expectedTxId = txId))
            } catch (e: Exception) {
                println("Error signing lock asset transaction by recipient: ${e.message}\n")
                return subFlow(ReceiveFinalityFlow(recipientSession))
            }
        }
    }

}

/**
 * The IsAssetLockedHTLC flow is used to check if an asset is locked.
 *
 * @property linearId The unique identifier for an AssetExchangeHTLCState.
 */
@StartableByRPC
class IsAssetLockedHTLC(
        val linearId: UniqueIdentifier
) : FlowLogic<Boolean>() {
    /**
     * The call() method captures the logic to check if asset is locked.
     *
     * @return Returns Boolean True/False
     */
    @Suspendable
    override fun call(): Boolean {
        println("Getting AssetExchangeHTLCState for linearId $linearId.")
        val states = serviceHub.vaultService.queryBy<AssetExchangeHTLCState>(
            QueryCriteria.LinearStateQueryCriteria(linearId = listOf(linearId))
        ).states
        if (states.isEmpty()) {
            println("No states found")
            return false
        } else {
            println("Got AssetExchangeHTLCState: ${states.first().state.data}")
            return true
        }
    }
}

/**
 * The GetAssetExchangeHTLCStateById flow is used to fetch an existing AssetExchangeHTLCState.
 *
 * @property linearId The unique identifier for an AssetExchangeHTLCState.
 */
@StartableByRPC
class GetAssetExchangeHTLCStateById(
        val linearId: UniqueIdentifier
) : FlowLogic<Either<Error, StateAndRef<AssetExchangeHTLCState>>>() {
    /**
     * The call() method captures the logic to fetch the AssetExchangeHTLCState.
     *
     * @return Returns Either<Error, AssetExchangeHTLCState>
     */
    @Suspendable
    override fun call(): Either<Error, StateAndRef<AssetExchangeHTLCState>> = try {
        println("Getting AssetExchangeHTLCState for contractId $linearId.")
        val states = serviceHub.vaultService.queryBy<AssetExchangeHTLCState>(
            QueryCriteria.LinearStateQueryCriteria(linearId = listOf(linearId))
        ).states
        if (states.isEmpty()) {
            Left(Error("AssetExchangeHTLCState for Id: ${linearId} not found."))
        } else {
            println("Got AssetExchangeHTLCState: ${states.first().state.data}")
            Right(states.first())
        }
    } catch (e: Exception) {
        println("Error fetching state from the vault: ${e.message}\n")
        Left(Error("Error fetching state from the vault: ${e.message}"))
    }
}

/**
 * The ClaimAssetHTLC flow is used to claim a locked asset using HTLC.
 *
 * @property linearId The unique identifier for an AssetExchangeHTLCState.
 * @property assetClaim The [AssetLocks.AssetClaimHTLC] containing hash preImage.
 */
object ClaimAssetHTLC {
    @InitiatingFlow
    @StartableByRPC
    class Initiator(
            val linearId: UniqueIdentifier,
            val claimInfo: AssetLocks.AssetClaimHTLC,
            val assetStateCreateCommand: CommandData,
            val assetStateContractId: String,
            val updateOwnerFlow: String
    ) : FlowLogic<Either<Error, SignedTransaction>>() {
        /**
         * The call() method captures the logic to claim the asset by revealing preimage.
         *
         * @return Returns SignedTransaction.
         */
        @Suspendable
        override fun call(): Either<Error, SignedTransaction> = try {
            subFlow(GetAssetExchangeHTLCStateById(linearId)).fold({
                println("AssetExchangeHTLCState for Id: ${linearId} not found.")
                Left(Error("AssetExchangeHTLCState for Id: ${linearId} not found."))            
            }, {
                val inputState = it
                val assetExchangeHTLCState = inputState.state.data
                println("Party: ${ourIdentity} ClaimAssetHTLC: ${assetExchangeHTLCState}")
                val notary = inputState.state.notary
                val claimInfoData = AssetClaimHTLCData(
                    hashPreimage = OpaqueBytes(Base64.getDecoder().decode(claimInfo.hashPreimageBase64.toByteArray()))
                )
                val claimCmd = Command(AssetExchangeHTLCStateContract.Commands.Claim(claimInfoData),
                    listOf(
                        assetExchangeHTLCState.recipient.owningKey
                    )
                )
                val assetCreateCmd = Command(assetStateCreateCommand, 
                    listOf(
                        assetExchangeHTLCState.recipient.owningKey
                    )
                )
                
                resolveUpdateOwnerFlow(updateOwnerFlow, 
                    listOf(assetExchangeHTLCState.assetStatePointer)
                ).fold({
                    println("Error: Unable to resolve Update Owner Flow.\n")
                    Left(Error("Error: Unable to resolve Update Owner Flow"))
                }, {
                    println("Resolved Update owner flow to ${it}")
                    val newAssetState = subFlow(it)
                                
                    val txBuilder = TransactionBuilder(notary)
                            .addInputState(inputState)
                            .addOutputState(newAssetState, assetStateContractId)
                            .addCommand(claimCmd)
                            .addCommand(assetCreateCmd)
                            .setTimeWindow(TimeWindow.untilOnly(assetExchangeHTLCState.lockInfo.expiryTime))
                    
                    // Verify and collect signatures on the transaction        
                    txBuilder.verify(serviceHub)
                    val sTx = serviceHub.signInitialTransaction(txBuilder)
                    println("Recipient signed transaction.")
                    
                    val lockerSession = initiateFlow(assetExchangeHTLCState.locker)
                    Right(subFlow(FinalityFlow(sTx, setOf(lockerSession))))
                })
            })
        } catch (e: Exception) {
            println("Error claiming: ${e.message}\n")
            Left(Error("Failed to claim: ${e.message}"))
        }   
    }
    
    @InitiatedBy(Initiator::class)
    class Acceptor(val lockerSession: FlowSession) : FlowLogic<SignedTransaction>() {
        @Suspendable
        override fun call(): SignedTransaction {
            
            return subFlow(ReceiveFinalityFlow(lockerSession))
        }
    }
}

/**
 * The UnlockAssetHTLC flow is used to unlock a locked asset using HTLC.
 *
 * @property linearId The unique identifier for an AssetExchangeHTLCState.
 */
object UnlockAssetHTLC {
    @InitiatingFlow
    @StartableByRPC
    class Initiator(
            val linearId: UniqueIdentifier,
            val assetStateCreateCommand: CommandData,
            val assetStateContractId: String
    ) : FlowLogic<Either<Error, SignedTransaction>>() {
        /**
         * The call() method captures the logic to unlock an asset.
         *
         * @return Returns SignedTransaction.
         */
        @Suspendable
        override fun call(): Either<Error, SignedTransaction> = try {
            subFlow(GetAssetExchangeHTLCStateById(linearId)).fold({
                println("AssetExchangeHTLCState for Id: ${linearId} not found.")
                Left(Error("AssetExchangeHTLCState for Id: ${linearId} not found."))            
            }, {
                val assetExchangeHTLCState = it.state.data
                println("Party: ${ourIdentity} UnlockAssetHTLC: ${assetExchangeHTLCState}")
                val notary = it.state.notary
                val unlockCmd = Command(AssetExchangeHTLCStateContract.Commands.Unlock(),
                    listOf(
                        assetExchangeHTLCState.locker.owningKey
                    )
                )
                val assetCreateCmd = Command(assetStateCreateCommand, 
                    listOf(
                        assetExchangeHTLCState.locker.owningKey
                    )
                )
                
                val reclaimAssetState = assetExchangeHTLCState.assetStatePointer.resolve(serviceHub).state.data
                
                val txBuilder = TransactionBuilder(notary)
                        .addInputState(it)
                        .addOutputState(reclaimAssetState, assetStateContractId)
                        .addCommand(unlockCmd)
                        .addCommand(assetCreateCmd)
                        .setTimeWindow(TimeWindow.fromOnly(assetExchangeHTLCState.lockInfo.expiryTime))
                
                // Verify and collect signatures on the transaction        
                txBuilder.verify(serviceHub)
                val sTx = serviceHub.signInitialTransaction(txBuilder)
                println("Locker signed transaction.")
                
                val recipientSession = initiateFlow(assetExchangeHTLCState.recipient)
                Right(subFlow(FinalityFlow(sTx, setOf(recipientSession))))
            })
        } catch (e: Exception) {
            println("Error unlocking: ${e.message}\n")
            Left(Error("Failed to unlock: ${e.message}"))
        }
    }
    
    @InitiatedBy(Initiator::class)
    class Acceptor(val recipientSession: FlowSession) : FlowLogic<SignedTransaction>() {
        @Suspendable
        override fun call(): SignedTransaction {
            
            return subFlow(ReceiveFinalityFlow(recipientSession))
        }
    }
}

/**
 * The resolveFlow function uses reflection to construct an instance of FlowLogic from the given
 * flow name and arguments.
 *
 * @param flowName The name of the flow provided by the remote client.
 * @param flowArgs The list of arguments for the flow provided by the remote client.
 * @return Returns an Either with an instance of FlowLogic if it was resolvable, or an Error.
 */
fun resolveUpdateOwnerFlow(flowName: String, flowArgs: List<Any>): Either<Error, FlowLogic<ContractState>> = try {
    println("Attempting to resolve $flowName to a Corda flow.")
    val kotlinClass = Class.forName(flowName).kotlin
    val ctor = kotlinClass.constructors.first()
    if (ctor.parameters.size != flowArgs.size) {
        println("Flow Resolution Error: wrong number of arguments supplied.\n")
        Left(Error("Flow Resolution Error: wrong number of arguments supplied"))
    } else {
        try {
            Right(ctor.call(*flowArgs.toTypedArray()) as FlowLogic<ContractState>)
        } catch (e: Exception) {
            println("Flow Resolution Error: $flowName not a flow: ${e.message}.\n")
            Left(Error("Flow Resolution Error: $flowName not a flow"))
        }
    }
} catch (e: Exception) {
    println("Flow Resolution Error: ${e.message} \n")
    Left(Error("Flow Resolution Error: ${e.message}"))
}