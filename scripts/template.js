const runScript = require('../src/runScript');

runScript(async (token, ownerAddress) => {
  // Script here
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
