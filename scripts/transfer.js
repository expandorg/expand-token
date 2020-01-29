const runScript = require('../src/runScript');
const BigNumber = require('bignumber.js');

runScript(async (token, ownerAddress, web3) => {
  const requester = '0x08947BF8995c9E286E5Fbbb01ccf5D298fDcdA60';
  BigNumber.config({DECIMAL_PLACES: 18});
  const amt = new BigNumber(2000000);
console.log(amt.toFixed(18));
  const log = await token.transfer(requester, amt.multipliedBy(1e18).toFixed(18));
  console.log(log);

})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
