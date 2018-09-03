const assert = require('assert');
const Big = require('bignumber.js');
const runScript = require('../src/runScript');

const totalSupply = new Big('8e27');
const distributedBalance = new Big('5e22');
const initialUserBalance = new Big('1e22');
const value = 1e9;

async function assertRevert(fn) {
  let err;
  try {
    await fn();
  } catch (e) {
    err = e;
  }
  assert(err.name === 'StatusError');
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

runScript(async (token, ownerAddress, web3, watcher) => {
  const aAddress = web3.eth.accounts[4];
  const bAddress = web3.eth.accounts[5];

  // inital owner balance should equal total supply
  const ownerBalance = await token.balanceOf(ownerAddress);
  assert(ownerBalance.eq(totalSupply.minus(distributedBalance)));

  // initial user a balance should equal zero
  const aBalance = await token.balanceOf(aAddress);
  assert(aBalance.eq(initialUserBalance));

  // initial user b balance should equal zero
  const bBalance = await token.balanceOf(bAddress);
  assert(bBalance.eq(initialUserBalance));

  // transfer from owner to user a should not throw error
  await assertNoError(() => token.transfer(aAddress, value));

  // user a balance should be updated correctly
  const aNewBalance = await token.balanceOf(aAddress);
  assert(aNewBalance.eq(initialUserBalance.plus(value)));

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
