const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3) => {
  const requester = '0x44ef27b7ee0527ea31bc272718dd0d9e62a48692';
  const log = await token.transfer(requester, 65000e18);
  console.log(log);
  // const balance = await token.balanceOf(requester);
  // console.log(balance);
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
