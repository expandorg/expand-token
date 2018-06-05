const assert = require('assert');
const Big = require('bignumber.js');
const runScript = require('../src/runScript');

const totalSupply = new Big('8e27');
const balance = new Big('10000e18');
const value = 1e9;

async function assertRevert(fn) {
  let err;
  try {
    await fn();
  } catch (e) {
    err = e;
  }
  assert(err.toString() === 'Error: Transaction rejected');
}

async function assertNoError(fn) {
  let err;
  try {
    await fn();
  } catch (e) {
    err = e;
  }
  assert(err === undefined);
}

runScript(async (token, ownerAddress, web3) => {
  const aAddress = web3.eth.accounts[1];
  const bAddress = web3.eth.accounts[2];

  // inital owner balance should equal total supply
  const ownerBalance = await token.balanceOf(ownerAddress);
  assert(ownerBalance.eq(totalSupply.minus(balance)));

  // initial user a balance should equal zero
  const aBalance = await token.balanceOf(aAddress);
  assert(aBalance.eq(0));

  // initial user b balance should equal zero
  const bBalance = await token.balanceOf(bAddress);
  assert(bBalance.eq(0));

  // transfer from owner to user a should not throw error
  await assertNoError(() => token.transfer(aAddress, value));

  // user a balance should be updated correctly
  const aNewBalance = await token.balanceOf(aAddress);
  assert(aNewBalance.eq(value));

  // transfer from a to b should fail without approval
  await assertRevert(() => token.transferFrom(aAddress, bAddress, value));

  // approval should not throw error
  await assertNoError(() => token.approve(aAddress, value));

  // user a allowance should reflect approval
  const aAllowance = await token.allowance(ownerAddress, aAddress);
  assert(aAllowance.eq(value));
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
