const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3, watcher) => {
  const vaultAddress = '0x5f3ebfe1fc670018e121224bb95007d8b498359b';
  const deposit = 10000e18;
  const vaultTransferLog = await token.transfer(vaultAddress, deposit);
  console.log(vaultTransferLog);

  const approve = 1000e18;
  const tokenAllowLog = await token.approve(vaultAddress, approve);
  console.log(tokenAllowLog);
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
