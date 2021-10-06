import { GluegunCommand } from 'gluegun'
import { getNetworkConfig, commandHelp } from '../../helper/helper'
import { getContractInstance } from '../../helper/besu-functions'
const Web3 = require ("web3")
const crypto = require('crypto')

const command: GluegunCommand = {
  name: 'lock',
  
  run: async toolbox => {
    const {
      print,
      parameters: { options }
    } = toolbox
    if (options.help || options.h) {
      commandHelp(
        print,
        toolbox,
        `besu-cli asset lock --local-network=network1 mychannel interop  Create '["test", "teststate"]'`,
        'fabric-cli chaincode invoke --local-network=<network1|network2> --user=<user-id> <channel-name> <contract-name> <function-name> <args>',
        [
          {
            name: '--network',
            description:
              'network for command. <network1|network2>'
          },
          {
            name: '--token_contract',
            description:
              'Path to the json file corresponding to the token contract compiled with Truffle.'
	  },
          {
            name: '--interop_contract',
            description:
              'Path to the json file corresponding to the interop contract compiled with Truffle.'
	  },
	  {
	    name: '--sender_account',
	    description:
	    'The index of the account of the sender/owner of the asset from the list obtained through web3.eth.getAccounts(). For example, we can set Alice as accounts[1] and hence value of this parameter for Alice can be 1.'
	  },
	  {
	    name: '--recipient_account',
	    description:
	    'The index of the account of the recipient of the asset from the list obtained through web3.eth.getAccounts(). For example, we can set Alice as accounts[1] and hence value of this parameter for Alice can be 1.'
	  },
          {
            name: '--amount',
            description:
              'The amount of fungible assets to be locked from the sender account specified on the network'
          },
	  {
	    name: '--timeout',
	    description:
	      'Time in seconds for which the asset will be locked. The asset will be locked till Date.now() + the timeout provided'
	  },
	  {
	    name: '--hash',
	    description:
	      'The hash value with which the asset will be locked i.e., providing its pre-image will enable unlocking the asset. This is an optional parameter. If not provided, we will generate a fresh hash pair with a randomly generated pre-image and output the corresponding pre-image.'
	  }
        ],
        command,
        ['asset', 'lock']
      )
      return
    }
    	print.info('Lock assets (fungible assets for now)')
   	const networkConfig = getNetworkConfig(options.network)
    	console.log(networkConfig)
	console.log('Token contract', options.token_contract)
	console.log('Interop contract', options.interop_contract)
	console.log('Sender', options.sender_account)
	console.log('Receiver', options.recipient_account)
	console.log('Amount', options.amount)
	console.log('Timeout', options.timeout)


        const provider = new Web3.providers.HttpProvider('http://'+networkConfig.networkHost+':'+networkConfig.networkPort)
        const web3N = new Web3(provider)
	const interopContract = await getContractInstance(provider, options.interop_contract)
	const tokenContract = await getContractInstance(provider, options.token_contract)
	const accounts = await web3N.eth.getAccounts()

	// Receving the input parameters
	const amount = options.amount
	const sender = accounts[options.sender_account]
	const recipient = accounts[options.recipient_account]
	const timeLock = Math.floor(Date.now() / 1000) + options.timeout
	var hash
	var preimage

//	if(options.hash != ''){
//		hash = options.hash
//	}
//	else {
		// Generate a hash pair if not provided as an input parameter
		preimage = crypto.randomBytes(32)
		hash = crypto.createHash('sha256').update(preimage).digest()
//	}
	console.log('Preimage: ', preimage)
	console.log('Hash: ', hash)

	//const Alice = accounts[1] // owner of AliceERC20 and wants swap for BobERC20
	//const Bob = accounts[2] // owner of BobERC20 and wants to swap for AliceERC20
	//console.log("Alice address in Network ${options.network}", Alice)
	//console.log("Bob address in Network ${options.network}", Bob)

	// Balances of sender and receiver before locking
	console.log(`Account balances before locking`)
	var senderBalance = await tokenContract.balanceOf(sender)
	console.log(`Account balance of the sender in Network ${options.network}: ${senderBalance.toString()}`)
	var recipientBalance = await tokenContract.balanceOf(recipient)
	console.log(`Account balance of the recipient in Network ${options.network}: ${recipientBalance.toString()}`)

	// Locking the asset (works only for ERC20 at this point)
	await tokenContract.approve(interopContract.address, amount, {from: sender})

	//token, tokenAmount, htlc, config, initiator, counterparty
	//BobERC20, tokenAmount, htlc2, {hashlock: hashPair.hash, timelock: timeLockSeconds}, Bob2, Alice2

	const lockTx = await interopContract.lockFungibleAsset(
		recipient,
		hash,
		timeLock,
		tokenContract.address,
		amount,
		{
			from: sender
		}
	)
	const lockContractId = lockTx.logs[0].args.contractId
	console.log(`Lock contract ID: ${lockContractId}`)

	// Balances of sender and receiver after locking
	console.log(`Account balances after locking`)
	var senderBalance = await tokenContract.balanceOf(sender)
	console.log(`Account balance of the sender in Network ${options.network}: ${senderBalance.toString()}`)
	var recipientBalance = await tokenContract.balanceOf(recipient)
	console.log(`Account balance of the recipient in Network ${options.network}: ${recipientBalance.toString()}`)


	var balance = await tokenContract.balanceOf(accounts[options.sender_account])
	console.log(`Account balance of accounts[${options.sender_account}] in Network ${options.network}: ${balance.toString()}`)
  }
}

module.exports = command
