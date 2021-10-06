import { GluegunCommand } from 'gluegun'
import { getNetworkConfig, commandHelp } from '../../helper/helper'
import { getContractInstance } from '../../helper/besu-functions'
const Web3 = require ("web3")

const command: GluegunCommand = {
  name: 'unlock',
  
  run: async toolbox => {
    const {
      print,
      parameters: { options }
    } = toolbox
    if (options.help || options.h) {
      commandHelp(
        print,
        toolbox,
        `besu-cli asset unlock --local-network=network1 mychannel interop  Create '["test", "teststate"]'`,
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
            name: '--lock_contract_id',
            description:
	    'The address / ID of the lock contract.'
	  },
	  {
	    name: '--sender_account',
	    description:
	    'The index of the account of the sender of the asset from the list obtained through web3.eth.getAccounts(). For example, we can set Alice as accounts[1] and hence value of this parameter for Alice can be 1.'
	  }
        ],
        command,
        ['asset', 'claim']
      )
      return
    }
    	print.info('Claim assets (fungible assets for now)')
   	const networkConfig = getNetworkConfig(options.network)
    	console.log(networkConfig)
	console.log('Token contract', options.token_contract)
	console.log('Interop contract', options.interop_contract)
	console.log('Sender', options.sender_account)
	console.log('Lock Contract ID', options.lock_contract_id)


        const provider = new Web3.providers.HttpProvider('http://'+networkConfig.networkHost+':'+networkConfig.networkPort)
        const web3N = new Web3(provider)
	const interopContract = await getContractInstance(provider, options.interop_contract)
	const tokenContract = await getContractInstance(provider, options.token_contract)
	const accounts = await web3N.eth.getAccounts()

	// Receiving the input parameters
	//const amount = options.amount
	const sender = accounts[options.sender_account]
	//const recipient = accounts[options.recipient_account]
	const lockContractId = options.lock_contract_id
	//const timeLock = Math.floor(Date.now() / 1000) + options.timeout
	//var hash
	//var preimage

	// Balance of the recipient before claiming
	var senderBalance = await tokenContract.balanceOf(sender)
	console.log(`Account balance of the sender in Network ${options.network} before claiming: ${senderBalance.toString()}`)


	await interopContract.unlockFungibleAsset(lockContractId, {
	          from: sender
	})

	//const contractArr = await interopContract.getContract.call(lockContractId)
	//const contract = htlcERC20ArrayToObj(contractArr)
	//assert.isTrue(contract.withdrawn) // withdrawn set
	//assert.isFalse(contract.refunded) // refunded still false
	//assert.equal(contract.preimage, options.claim_preimage)

	//return contract.withdrawn // the withdrawn flag is set iff the withdraw function is successful

	// Balance of the recipient after claiming
	var senderBalance = await tokenContract.balanceOf(sender)
	console.log(`Account balance of the sender in Network ${options.network} after claiming: ${senderBalance.toString()}`)
  }
}

module.exports = command
