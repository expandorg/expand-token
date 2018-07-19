const { GemsToken } = require('../src/GemsToken');
const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3, watcher) => {
  const vaultAddress = '0x5f3ebfe1fc670018e121224bb95007d8b498359b';
  const worker1Address = '0xcdfc424daeea84e51b8f5887196d0209fe9289b2';
  const deposit = 10000e18;
  const approve = 1000e18;

  const worker1Token = new GemsToken(web3.currentProvider, worker1Address);
  await worker1Token.init();

  const vaultTransferLog = await token.transfer(vaultAddress, deposit);
  console.log(vaultTransferLog);

  const worker1TransferLog = await token.transfer(worker1Address, deposit);
  console.log(worker1TransferLog);

  const worker1AllowLog = await worker1Token.approve(vaultAddress, approve);
  console.log(worker1AllowLog);
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
