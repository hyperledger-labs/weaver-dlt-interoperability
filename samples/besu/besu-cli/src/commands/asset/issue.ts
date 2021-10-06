import { GluegunCommand } from 'gluegun'
import { getNetworkConfig, commandHelp } from '../../helper/helper'
import { getContractInstance } from '../../helper/besu-functions'
const Web3 = require ("web3")

const command: GluegunCommand = {
  name: 'issue',
  
  run: async toolbox => {
    const {
      print,
      parameters: { options }
    } = toolbox
    if (options.help || options.h) {
      commandHelp(
        print,
        toolbox,
        `besu-cli asset issue --local-network=network1 mychannel interop  Create '["test", "teststate"]'`,
        'fabric-cli chaincode invoke --local-network=<network1|network2> --user=<user-id> <channel-name> <contract-name> <function-name> <args>',
        [
          {
            name: '--network',
            description:
              'network for command. <network1|network2>'
          },
          {
            name: '--contract',
            description:
              'Path to the json file corresponding to the token contract compiled with Truffle.'
	  },
	  {
	    name: '--account',
	    description:
	      'The index of the account from the list obtained through web3.eth.getAccounts(). For example, we can set Alice as accounts[1] and hence value of this parameter for Alice can be 1.'
	  },
          {
            name: '--amount',
            description:
              'The amount to be added to the account specified on the network'
          }
        ],
        command,
        ['asset', 'issue']
      )
      return
    }
    print.info('Issuance of tokens')
    const networkConfig = getNetworkConfig(options.network)
    console.log(networkConfig)

        const provider = new Web3.providers.HttpProvider('http://'+networkConfig.networkHost+':'+networkConfig.networkPort)
        const web3N = new Web3(provider)
	const tokenContract = await getContractInstance(provider, options.contract)
        const accounts = await web3N.eth.getAccounts()

	//const Alice = accounts[1] // owner of AliceERC20 and wants swap for BobERC20
	//const Bob = accounts[2] // owner of BobERC20 and wants to swap for AliceERC20
	//console.log("Alice address in Network ${options.network}", Alice)
	//console.log("Bob address in Network ${options.network}", Bob)

        const contractOwner = accounts[0]

	// Transfer from the contract owner to the account specified
	await tokenContract.transfer(accounts[options.account], options.amount, {from: contractOwner})

	var balance = await tokenContract.balanceOf(accounts[options.account])
	console.log(`Account balance of accounts[${options.account}] in Network ${options.network}: ${balance.toString()}`)
  }
}

module.exports = command
