pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CanReclaimToken is Ownable {
  using SafeERC20 for ERC20;

  /**
   * @dev Reclaim all ERC20 compatible tokens
   * @param token ERC20 The address of the token contract
   */
  function reclaimToken(ERC20 token) external onlyOwner {
    uint256 balance = address(this).balance;
    token.safeTransfer(owner(), balance);
  }

}