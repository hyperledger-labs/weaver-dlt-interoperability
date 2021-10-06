import { GluegunCommand } from 'gluegun'
import { getNetworkConfig, commandHelp } from '../../helper/helper'
import { getContractInstance } from '../../helper/besu-functions'
const Web3 = require ("web3")

const command: GluegunCommand = {
  name: 'get-balance',
  
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
            name: '--token-contract',
            description:
              'Path to the json file corresponding to the token contract compiled with Truffle.'
	  },
	  {
	    name: '--account',
	    description:
	      'The index of the account from the list obtained through web3.eth.getAccounts(). For example, we can set Alice as accounts[1] and hence value of this parameter for Alice can be 1.'
	  },
        ],
        command,
        ['asset', 'get-balance']
      )
      return
    }
    print.info('Get account balance of tokens')
    const networkConfig = getNetworkConfig(options.network)
    console.log(networkConfig)

        const provider = new Web3.providers.HttpProvider('http://'+networkConfig.networkHost+':'+networkConfig.networkPort)
        const web3N = new Web3(provider)
        const accounts = await web3N.eth.getAccounts()

	const tokenContract = await getContractInstance(provider, options.contract)

	var balance = await tokenContract.balanceOf(accounts[options.account])
	console.log(`Account balance of accounts[${options.account}] in Network ${options.network}: ${balance.toString()}`)
  }
}

module.exports = command
