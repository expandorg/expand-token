const assert = require('assert');
const Big = require('bignumber.js');
const runScript = require('../src/runScript');


runScript(async (token, ownerAddress, web3) => {
  const aAddress = "0xa249373d2271246379bb5eb0e8bfd18b37ec8125";
  const signedMessage = await web3.eth.sign("0xa249373d2271246379bb5eb0e8bfd18b37ec8125", "[Etherscan.io 04/01/2019 03:17:37] I, hereby verify that the information provided is accurate and I am the owner/creator of the token contract address [0xc7bba5b765581efb2cdd2679db5bea9ee79b201f]", (err, res) => {console.log(res);});
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
