if (!global.assert) global.assert = require('chai').assert

const Web3 = require ("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

const assertEqualBN = (actual, expected, msg = 'numbers not equal') => {
  if (!web3.utils.isBN(actual))
    actual = web3.utils.toBN(actual)
  if (!web3.utils.isBN(expected))
    expected = web3.utils.toBN(expected)
  assert.isTrue(
    actual.eq(expected),
    `
\tmsg: ${msg}
\tactual: ${actual.toString()}
\texpected: ${expected.toString()}
`
  )
}

module.exports = {assertEqualBN}
