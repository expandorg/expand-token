const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3, watcher) => {
  const vaultAddress = '0x5f3ebfe1fc670018e121224bb95007d8b498359b';
  const deposit = 10000*1e+18;
  const log = await token.transfer(vaultAddress, deposit);
  console.log(log);
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
