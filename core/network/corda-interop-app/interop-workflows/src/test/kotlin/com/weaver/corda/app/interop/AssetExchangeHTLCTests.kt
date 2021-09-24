/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

package com.weaver.corda.app.interop

import arrow.core.Either
import com.weaver.corda.app.interop.flows.*
import com.weaver.corda.app.interop.states.AssetExchangeHTLCState
import com.weaver.corda.app.interop.states.AssetLockHTLC
import com.weaver.corda.app.interop.states.AssetClaimHTLC

import com.weaver.corda.app.interop.test.*

import com.weaver.protos.common.query.QueryOuterClass
import net.corda.core.contracts.UniqueIdentifier
import net.corda.core.node.services.queryBy
import net.corda.core.utilities.getOrThrow
import net.corda.testing.node.*
import org.junit.AfterClass
import org.junit.BeforeClass
import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

import net.corda.core.node.services.vault.QueryCriteria
import net.corda.core.contracts.StateAndRef
import java.util.Base64
import java.time.Instant
import net.corda.core.utilities.OpaqueBytes

import net.corda.core.contracts.TransactionState
import net.corda.core.contracts.StateRef
import net.corda.core.crypto.SecureHash

class AssetExchangeHTLCTests {
    companion object {
        lateinit var network: MockNetwork
        lateinit var partyA: StartedMockNode
        lateinit var partyB: StartedMockNode
        lateinit var partyC: StartedMockNode

        @BeforeClass
        @JvmStatic
        fun setup() {
            network = MockNetwork(MockNetworkParameters(cordappsForAllNodes = listOf(
                    TestCordapp.findCordapp("com.weaver.corda.app.interop.contracts"),
                    TestCordapp.findCordapp("com.weaver.corda.app.interop.flows"),
                    TestCordapp.findCordapp("com.weaver.corda.app.interop.test")
            )))
            partyA = network.createPartyNode()
            partyB = network.createPartyNode()
            partyC = network.createPartyNode()
            network.runNetwork()
        }

        @AfterClass
        @JvmStatic
        fun tearDown() {
            network.stopNodes()
            System.setProperty("net.corda.node.dbtransactionsresolver.InMemoryResolutionLimit", "0")
        }
    }
    
    val alice = partyA.info.legalIdentities.first()
    val bob = partyB.info.legalIdentities.first()
    val charlie = partyC.info.legalIdentities.first()
    
    val preimage = OpaqueBytes("secrettext".toByteArray())
    val hash = OpaqueBytes(Base64.getDecoder().decode("ivHErp1x4bJDKuRo6L5bApO/DdoyD/dG0mAZrzLZEIs="))
    
    val asset = AssetState(
        "a01",
        alice
    )
    var lockInfo = AssetLockHTLC(
        hash,
        Instant.now().plusSeconds(10)
    )
    val claimInfo = AssetClaimHTLC(
        preimage
    )
    
    fun createAssetTx(): StateAndRef<AssetState> {
        val tmp = partyA.startFlow(CreateAsset("a01", alice))
        network.runNetwork()
        return tmp.getOrThrow()
    }
    
    @Test
    fun `LockAssetHTLC tests`() {
        val assetStateRef = createAssetTx()
        
        // UnHappy case: Third party trying to lock asset of alice.
        val futureFail = partyB.startFlow(LockAssetHTLC.Initiator(
            lockInfo,
            assetStateRef,
            AssetStateContract.Commands.Delete(),
            alice
        ))
        network.runNetwork()
        val linearIdFail = futureFail.getOrThrow()
        assert(linearIdFail.isLeft()) { "Can not lock someone else's asset" }
        
        // Happy case.
        val future = partyA.startFlow(LockAssetHTLC.Initiator(
            lockInfo,
            assetStateRef,
            AssetStateContract.Commands.Delete(),
            bob
        ))
        network.runNetwork()
        val linearId = future.getOrThrow()
        assert(linearId.isRight()) { "LockAssetHTLCInitiator should return a Right(UniqueIdentifier)" }

        linearId.fold({ println("Error") },{
            val states = partyA.services.vaultService
                    .queryBy<AssetExchangeHTLCState>(
                        QueryCriteria.LinearStateQueryCriteria(linearId = listOf(it))
                    ).states
            println(states.single().toString())
            assertEquals(1, states.size)
            val state = states.single().state.data
            assertEquals(lockInfo, state.lockInfo)
            assertEquals(alice, state.locker)
            assertEquals(bob, state.recipient)
        })
        

        // Unhappy case: asset is already locked
        val futureTwo = partyA.startFlow(LockAssetHTLC.Initiator(
            lockInfo,
            assetStateRef,
            AssetStateContract.Commands.Delete(),
            bob
        ))
        network.runNetwork()
        val error = futureTwo.getOrThrow()
        assert(error.isLeft()) { "Can not lock/consume locked asset again." }
    }
    
    @Test
    fun `ClaimAssetHTLC tests`() {
        var lockId = UniqueIdentifier()
        
        // Happy case.
        lockAsset().map{ id ->
            lockId = id
        }
        val future = partyB.startFlow(ClaimAssetHTLC.Initiator(
            lockId,
            claimInfo,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID,
            "com.weaver.corda.app.interop.test.UpdateOwnerFlow"
        ))
        network.runNetwork()
        val stx = future.getOrThrow()
        assert(stx.isRight()) { "ClaimAsset should be successfull" }

        stx.fold({ println("Error") },{
            val states = partyB.services.vaultService
                .queryBy<AssetState>().states
                .filter { it.state.data.id == "a01" }
                .map { it.state.data }
            println(states.single().toString())
            assertEquals(1, states.size)
            assertEquals("a01", states.single().id)
            assertEquals(bob, states.single().owner)
        })
    }
    
    @Test
    fun `ClaimAssetHTLC Fail tests`() {
        var lockId = UniqueIdentifier()
        
        // Unhappy case: Claim after timeout
        lockAsset().map{ id ->
            lockId = id
        }
        
        val wrongClaimInfo = AssetClaimHTLC(
            OpaqueBytes("secretwrong".toByteArray())
        )
        val futureOne = partyB.startFlow(ClaimAssetHTLC.Initiator(
            lockId,
            wrongClaimInfo,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID,
            "com.weaver.corda.app.interop.test.UpdateOwnerFlow"
        ))
        network.runNetwork()
        val stxOne = futureOne.getOrThrow()
        assert(stxOne.isLeft()) { "ClaimAsset should be unsuccessfull as preimage is not correct" }
        
        val futureTwo = partyA.startFlow(ClaimAssetHTLC.Initiator(
            lockId,
            claimInfo,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID,
            "com.weaver.corda.app.interop.test.UpdateOwnerFlow"
        ))
        network.runNetwork()
        val stxTwo = futureTwo.getOrThrow()
        assert(stxTwo.isLeft()) { "ClaimAsset should be unsuccessfull as only recipient can claim" }
        
        val futureTwo2 = partyC.startFlow(ClaimAssetHTLC.Initiator(
            lockId,
            claimInfo,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID,
            "com.weaver.corda.app.interop.test.UpdateOwnerFlow"
        ))
        network.runNetwork()
        val stxTwo2 = futureTwo2.getOrThrow()
        assert(stxTwo2.isLeft()) { "ClaimAsset should be unsuccessfull as only recipient can claim" }
        
        Thread.sleep(10000L)
        
        val futureThree = partyB.startFlow(ClaimAssetHTLC.Initiator(
            lockId,
            claimInfo,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID,
            "com.weaver.corda.app.interop.test.UpdateOwnerFlow"
        ))
        network.runNetwork()
        val stxThree = futureThree.getOrThrow()
        assert(stxThree.isLeft()) { "ClaimAsset should be unsuccessfull after timeout" }
    }
    
    @Test
    fun `UnlockAssetHTLC tests`() {
        var lockId = UniqueIdentifier()
        
        lockAsset().map{ id ->
            lockId = id
        }
        
        // Unhappy case: Unlock before Timeout
        val futureOne = partyA.startFlow(UnlockAssetHTLC.Initiator(
            lockId,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID
        ))
        network.runNetwork()
        val stxOne = futureOne.getOrThrow()
        assert(stxOne.isLeft()) { "UnlockAsset fails as timeout not expired" }
        
        Thread.sleep(10000L)
        
        // Unhappy case: recipient trying to unlock
        val futureTwo = partyB.startFlow(UnlockAssetHTLC.Initiator(
            lockId,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID
        ))
        network.runNetwork()
        val stxTwo = futureTwo.getOrThrow()
        assert(stxTwo.isLeft()) { "UnlockAsset fails as only locker can unlock" }
        
        val futureTwo2 = partyC.startFlow(UnlockAssetHTLC.Initiator(
            lockId,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID
        ))
        network.runNetwork()
        val stxTwo2 = futureTwo2.getOrThrow()
        assert(stxTwo2.isLeft()) { "UnlockAsset fails as only locker can unlock" }
        
        // Happy Case
        val future = partyA.startFlow(UnlockAssetHTLC.Initiator(
            lockId,
            AssetStateContract.Commands.Issue(),
            AssetStateContract.ID
        ))
        network.runNetwork()
        val stx = future.getOrThrow()
        assert(stx.isRight()) { "UnlockAsset should be successfull" }
        //assert(stx.isLeft()) { "UnlockAsset fails as timeout is not expired" }

        stx.fold({ println("Error") },{
            val states = partyA.services.vaultService
                .queryBy<AssetState>().states
                .filter { it.state.data.id == "a01" }
                .map { it.state.data }
            println(states.single().toString())
            assertEquals(1, states.size)
            assertEquals("a01", states.single().id)
            assertEquals(alice, states.single().owner)
        })
    }
    
    // Helper to successfully lock the asset
    fun lockAsset(): Either<Error, UniqueIdentifier> {
        val assetStateRef = createAssetTx()
        // Assert Initial Owner of asset to be alice
        assertEquals(alice, assetStateRef.state.data.owner)
        val future = partyA.startFlow(LockAssetHTLC.Initiator(
            lockInfo,
            assetStateRef,
            AssetStateContract.Commands.Delete(),
            bob
        ))
        network.runNetwork()
        return future.getOrThrow()
    }
}


