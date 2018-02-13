const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3) => {
  const requester = '0x20d8bf293799e4419e3e0f4d7a7caccadfaaca37';
  // const job = '0xb01df21dcfdfd1cd04c2d89ddc297533e711dfad';
  const log = await token.transfer(requester, 65000 * 10e+18);
  console.log(log);

  // const address = '0xb06ce79b3de08d40bffa0a6ef31acb72ede28eef';
  // const address = '0xad541f053351aa81bbb7eea2b8770781b892db6b';

  // const balance = await token.balanceOf(job);
  // console.log(balance.toNumber() / 10e+17);
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
