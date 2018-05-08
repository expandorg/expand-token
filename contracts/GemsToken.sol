pragma solidity 0.4.18;

import "zeppelin-solidity/contracts/ownership/HasNoContracts.sol";
import "zeppelin-solidity/contracts/ownership/HasNoEther.sol";
import "zeppelin-solidity/contracts/ownership/HasNoTokens.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract GemsToken is HasNoContracts, HasNoEther, HasNoTokens, StandardToken {
    string public constant name = "Gems Token";
    string public constant symbol = "GEM";
    uint8 public constant decimals = 18;
    uint public constant TOTAL_SUPPLY = (8*10**9)*10**uint(decimals);

    function GemsToken() public {
        totalSupply_ = TOTAL_SUPPLY;
        balances[msg.sender] = totalSupply_;
    }
}
