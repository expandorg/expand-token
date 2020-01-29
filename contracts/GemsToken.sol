pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract ExpandToken is ERC20, ERC20Detailed {
    constructor() ERC20Detailed("Gems Token", "GEM", 18) public {
        _mint(msg.sender, ((8*10**9)*10**18));
    }
}
