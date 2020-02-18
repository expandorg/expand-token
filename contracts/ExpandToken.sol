pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@expandorg/expand-token/contracts/CanReclaimToken.sol";

contract ExpandToken is ERC20, ERC20Detailed, CanReclaimToken {
    constructor() ERC20Detailed("Expand Token", "XPN", 18) public {
        _mint(msg.sender, ((8*10**9)*10**18));
    }
}
