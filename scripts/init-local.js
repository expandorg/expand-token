const { GemsToken } = require('../src/GemsToken');
const runScript = require('../src/runScript');
const accounts = require('../../accounts/local/addresses.json');

runScript(async (token, ownerAddress, web3, watcher) => {
  const deposit = 10000e18;
  const approve = 1000e18;

  const worker1Token = new GemsToken(web3.currentProvider, accounts.worker1.address);
  await worker1Token.init();

  const worker2Token = new GemsToken(web3.currentProvider, accounts.worker2.address);
  await worker2Token.init();

  const requester1Token = new GemsToken(web3.currentProvider, accounts.requester1.address);
  await requester1Token.init();

  const requester2Token = new GemsToken(web3.currentProvider, accounts.requester2.address);
  await requester2Token.init();

  const vaultTransferLog = await token.transfer(vaultAddress, deposit);
  console.log(vaultTransferLog);

  const worker1TransferLog = await token.transfer(worker1Address, deposit);
  console.log(worker1TransferLog);

  const worker2TransferLog = await token.transfer(worker2Address, deposit);
  console.log(worker2TransferLog);

  const requester1TransferLog = await token.transfer(requester1Address, deposit);
  console.log(requester1TransferLog);

  const requester2TransferLog = await token.transfer(requester2Address, deposit);
  console.log(requester2TransferLog);

  const worker1AllowLog = await worker1Token.approve(vaultAddress, approve);
  console.log(worker1AllowLog);

  const worker2AllowLog = await worker2Token.approve(vaultAddress, approve);
  console.log(worker2AllowLog);

  const requester1AllowLog = await requester1Token.approve(vaultAddress, approve);
  console.log(requester1AllowLog);

  const requester2AllowLog = await requester2Token.approve(vaultAddress, approve);
  console.log(requester2AllowLog);
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
