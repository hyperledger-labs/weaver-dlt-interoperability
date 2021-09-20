//var contract = require("@truffle/contract");
//const InteroperationBaseClassERC20Data = artificats.require('@hyperledger-labs/weaver-besu/build/contracts/InteroperationBaseClassERC20.json')
//const InteroperationBaseClassERC20 = contract(InteroperationBaseClassERC20Data)

const InteroperationBaseClassERC20 = artifacts.require('InteroperationBaseClassERC20')
const AliceERC20 = artifacts.require('./AliceERC20.sol')
const BobERC20 = artifacts.require('./BobERC20.sol')

module.exports = function (deployer) {
  deployer.deploy(InteroperationBaseClassERC20)
  deployer.deploy(AliceERC20, 1000)
  deployer.deploy(BobERC20, 1000)
}
