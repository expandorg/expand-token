const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3) => {
  // Script here
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));