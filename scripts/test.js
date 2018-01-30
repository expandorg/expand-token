const assert = require(assert);
const runScript = require('../src/runScript');

runScript(async (token, ownerAddress) => {
  const balance = await token.balanceOf(ownerAddress);
  console.log(balance);
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
