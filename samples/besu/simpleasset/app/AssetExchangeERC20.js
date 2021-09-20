const {assertEqualBN} = require('./helper/assert')
const {
  bufToStr,
  htlcERC20ArrayToObj,
  isSha256Hash,
  newSecretHashPair,
  nowSeconds,
  random32,
  txContractId,
  txLoggedArgs,
} = require('./helper/utils')
const promisify = require('util').promisify
const sleep = promisify(require('timers').setTimeout)
const truffleAssert = require('truffle-assertions')
const fs = require('fs')
const path = require('path')
const contract = require("@truffle/contract");
const Web3 = require ("web3")

const networkHost1 = "localhost"
const networkPort1 = "8545"
const networkHost2 = "localhost"
const networkPort2 = "9544"


const AliceERC20TokenContract = require('../build/contracts/AliceERC20.json')
const BobERC20TokenContract = require('../build/contracts/BobERC20.json')

let htlc1
let htlc2
let AliceERC20
let BobERC20
let hashPair // shared b/w the two swap contracts in both directions


// Function to obtain an instance of a smart contract when provided 
// as input the path to its JSON file output by 'truffle compile'.
// (Assuming that the current folder is a sibling folder to build, 
// the path to json would be ../build/contracts/ContractName.json)
async function getContractInstance(provider, pathToJson){

	const jsonFile = path.resolve(__dirname, pathToJson)
	var jsonFileContents = fs.readFileSync(jsonFile)
	var contractName = contract(JSON.parse(jsonFileContents))
	contractName.setProvider(provider)
	var instance = await contractName.deployed()

	return instance
}


// Initialization of the parameters
async function init(provider1, provider2, contractOwner1, contractOwner2, Alice1, Bob2, tokenSupply, senderInitialBalance) {
	
    	htlc1 = await getContractInstance(provider1,'../build/contracts/InteroperationBaseClassERC20.json') 
    	htlc2 = await getContractInstance(provider2,'../build/contracts/InteroperationBaseClassERC20.json') 

	AliceERC20 = await getContractInstance(provider1, '../build/contracts/AliceERC20.json')
	
	BobERC20 = await getContractInstance(provider2, '../build/contracts/BobERC20.json')

// ALREADY RUN ONCE: So commenting it out for now 
    await AliceERC20.transfer(Alice1, senderInitialBalance, {from: contractOwner1}) // so Alice has some tokens to trade in Network 1
    await BobERC20.transfer(Bob2, senderInitialBalance, {from: contractOwner2}) // so Bob has some tokens to trade in Network 2
//*/

// Asserts have to be rewritten
	/*
    await assertTokenBal(
      AliceERC20,
      Alice,
      senderInitialBalance,
      'balance not transferred to Alice in before()'
    )
    await assertTokenBal(
      AliceERC20,
      Bob,
      0,
      'Bob should not have any AliceERC20 tokens in before()'
    )
    await assertTokenBal(
      BobERC20,
      Bob,
      senderInitialBalance,
      'balance not transferred to Bob in before()'
    )
    await assertTokenBal(
      BobERC20,
      Alice,
      0,
      'Alice should not have any BobERC20 tokens in before()'
    )
*/
}


// Withdrawal function of a fungible asset/token of type tokenContractId 
// and amount tokenAmount locked using contractId for a receiver. 
// hashSecret is the secret to unlock the asset corresponding to the commitment 
// used when locking it
async function withdraw(htlc, contractId, tokenContractId, tokenAmount, receiver, hashSecret) {
    await htlc.claimFungibleAsset(contractId, hashSecret, {
      from: receiver,
    })

/*
    // Check tokens now owned by Alice
    await assertTokenBal(
      tokenContractId,
      receiver,
      tokenAmount,
      `${receiver} doesn't not own ${tokenAmount} tokens`
    )
*/

    const contractArr = await htlc.getContract.call(contractId)
    const contract = htlcERC20ArrayToObj(contractArr)
    assert.isTrue(contract.withdrawn) // withdrawn set
    assert.isFalse(contract.refunded) // refunded still false
    assert.equal(contract.preimage, hashSecret)

	return contract.withdrawn // the withdrawn flag is set iff the withdraw function is successful
}


const assertTokenBal = async (token, addr, tokenAmount, msg) => {
    assertEqualBN(
      await token.balanceOf.call(addr),
      tokenAmount,
      msg ? msg : 'wrong token balance'
    )
}

// Refund function
async function refund(htlc, contractId, tokenContract, sender, initialBalance, tokenAmount) {
    const currentBalance = initialBalance - tokenAmount

      let result = await htlc.unlockFungibleAsset(contractId, {
        from: sender
      })

      // verify the event was emitted
      //truffleAssert.eventEmitted(result, 'HTLCERC20Refund', ev => {
      //  return ev.contractId === a2bSwapId
      //}, `Refunded Alice`)

      //await assertTokenBal(tokenContract, sender, currentBalance)

}


// Function to create a new smart contract for locking asset for HTLC
// 'intitiator' locks 'tokenAmount' number of tokens of type 'token' for
// 'counterparty' using the contract constructs of 'htlc'. 
// 'config' contains the locking guidelines and parameters
const newHtlc = async (token, tokenAmount, htlc, config, initiator, counterparty) => {
    // initiator of the swap has to first designate the swap contract as a spender of his/her money
    // with allowance matching the swap amount
    await token.approve(htlc.address, tokenAmount, {from: initiator})
    return htlc.lockFungibleAsset(
      counterparty,
      config.hashlock,
      config.timelock,
      token.address,
      tokenAmount,
      {
        from: initiator,
      }
    )
}
  
/*
// Sender has the original secret, calls withdraw with the secret to claim the EU tokens
const withdraw = async (contractId, tokenContract, tokenAmount, receiver, hashSecret) => {
    await htlc.claimFungibleAsset(contractId, hashSecret, {
      from: sender,
    })

    // Check tokens now owned by Alice
    await assertTokenBal(
      tokenContract,
      sender,
      tokenAmount,
      `Alice doesn't not own ${tokenAmount} tokens`
    )

    const contractArr = await htlc.getContract.call(contractId)
    const contract = htlcERC20ArrayToObj(contractArr)
    assert.isTrue(contract.withdrawn) // withdrawn set
    assert.isFalse(contract.refunded) // refunded still false
    // with this the secret is out in the open and Bob will have knowledge of it
    assert.equal(contract.preimage, hashSecret)

    learnedSecret = contract.preimage
}
*/


async function getBalances(Alice1, Bob1, Alice2, Bob2) {

	var AliceAliceERC20Balance = await AliceERC20.balanceOf(Alice1)
	console.log("Alice balance in AliceERC20 in Network 1", AliceAliceERC20Balance.toString())
	
	var AliceBobERC20Balance = await BobERC20.balanceOf(Alice2)
	console.log("Alice balance in BobERC20 in Network 2", AliceBobERC20Balance.toString())
	
	var BobAliceERC20Balance = await AliceERC20.balanceOf(Bob1)
	console.log("Bob balance in AliceERC20 in Network 1", await BobAliceERC20Balance.toString())
	
	var BobBobERC20Balance = await BobERC20.balanceOf(Bob2)
	console.log("Bob balance in BobERC20 in Network 2", await BobBobERC20Balance.toString())

}


// Main entry point to the app
async function main() {

	// Network 1
	const provider1 = new Web3.providers.HttpProvider('http://'+networkHost1+':'+networkPort1)
	const web3N1 = new Web3(provider1)
	const accounts1 = await web3N1.eth.getAccounts()

	const Alice1 = accounts1[1] // owner of AliceERC20 and wants swap for BobERC20
	const Bob1 = accounts1[2] // owner of BobERC20 and wants to swap for AliceERC20
	console.log("Alice address in Network 1", Alice1)
	console.log("Bob address in Network 1", Bob1)

	const contractOwner1 = accounts1[0]


	// Network 2
	const provider2 = new Web3.providers.HttpProvider('http://'+networkHost2+':'+networkPort2)
	const web3N2 = new Web3(provider2)
	const accounts2 = await web3N2.eth.getAccounts()

	const Alice2 = accounts2[1] // owner of AliceERC20 and wants swap for BobERC20
	const Bob2 = accounts2[2] // owner of BobERC20 and wants to swap for AliceERC20
	console.log("Alice address in Network 2", Alice2)
	console.log("Bob address in Network 2", Bob2)

	const contractOwner2 = accounts2[0]

	// Initialization
	const tokenSupply = 1000
	const senderInitialBalance=100

	await init(provider1, provider2, contractOwner1, contractOwner2, Alice1, Bob2, tokenSupply, senderInitialBalance)

	console.log("\n Balances after init():")
	await getBalances(Alice1, Bob1, Alice2, Bob2)

    	hashPair = newSecretHashPair()
	let tokenAmount=10
	let timeOut = 15
    	let timeLockSeconds = nowSeconds() + 2*timeOut

	// Creating a HTLC contract for Alice locking her AliceERC20 tokens for Bob
    let newSwapTx = await newHtlc(AliceERC20, tokenAmount, htlc1, {hashlock: hashPair.hash, timelock: timeLockSeconds}, Alice1, Bob1)
    let a2bSwapId = txContractId(newSwapTx)

	console.log("\n Balances after creating a2bSwap contract in Network 1:")
	await getBalances(Alice1, Bob1, Alice2, Bob2)
    // check token balances
    //await assertTokenBal(AliceERC20, Alice, senderInitialBalance - tokenAmount)
    //await assertTokenBal(AliceERC20, htlc.address, tokenAmount)

  // Bob having observed the contract getting set up by Alice in the AliceERC20, now
  // responds by setting up the corresponding contract in the BobERC20, using the same
  // hash lock as Alice' side of the deal, so that he can be guaranteed Alice must
  // disclose the secret to unlock the BobERC20 tokens transfer, and the same secret can then
  // be used to unlock the AliceERC20 transfer
    // in a real world swap contract, the counterparty's swap timeout period should be shorter
    // but that does not affect the ideal workflow that we are testing here
    timeLockSeconds = nowSeconds() + timeOut
    newSwapTx = await newHtlc(BobERC20, tokenAmount, htlc2, {hashlock: hashPair.hash, timelock: timeLockSeconds}, Bob2, Alice2)
    let b2aSwapId = txContractId(newSwapTx)

	console.log("\n Balances after creating b2aSwap contract in Network 2:")
	await getBalances(Alice1, Bob1, Alice2, Bob2)
    // check token balances
    //await assertTokenBal(BobERC20, Bob, senderInitialBalance - tokenAmount)
    //await assertTokenBal(BobERC20, htlc.address, tokenAmount)

	// Alice withdrawing Bob's BobERC20 token from b2aAwapId contract
	let b2aSwapSuccess = await withdraw(htlc2, b2aSwapId, BobERC20, tokenAmount, Alice2, hashPair.secret)

	console.log("\n Balances after Alice withdraws in Network 2:")
	await getBalances(Alice1, Bob1, Alice2, Bob2)

	// If Alice's withdrawal is not successfull, then Alice and Bob claim a refund
	// of their locked tokens
	if(!b2aSwapSuccess){
		sleep(2*timeOut*1000)	
		await refund(htlc2, b2aSwapId, BobERC20, Bob2, senderInitialBalance, tokenAmount)
		await refund(htlc1, a2bSwapId, AliceERC20, Alice1, senderInitialBalance, tokenAmount)
	}
	else{
		// If Alice's withdrawal is successful, Bob goes ahead and withdraws Alice's
		// AliceERC20 tokens locked in the a2bSwapId contract
			let a2bSwapSuccess = await withdraw(htlc1, a2bSwapId, AliceERC20, tokenAmount, Bob1, hashPair.secret)  // we assume a2bSwap to be successful if b2aSwap is successful
	}

	console.log("\n Balances after Bob withdraws:")
	await getBalances(Alice1, Bob1, Alice2, Bob2)
}

main()
