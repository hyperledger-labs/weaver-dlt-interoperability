pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/**
 * A basic fungible token.
 */
contract TokenAsset is ERC20 {
    string public constant name = "TokenAsset";
    string public constant symbol = "TokenAsset";
    uint8 public constant decimals = 18;

    constructor(uint256 _initialBalance) public {
        _mint(msg.sender, _initialBalance);
    }
}
