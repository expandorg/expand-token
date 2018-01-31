const Web3 = require('web3');
const provider = require('../src/provider');
const GemsToken = require('../src/GemsToken');

const web3 = new Web3(provider);
const ownerAddress = process.env.ENV === 'local' ? web3.eth.accounts[0] : process.env.OWNER_ADDRESS;

async function runScript(script) {
  const token = new GemsToken(web3.currentProvider, ownerAddress);
  await token.init();
  await script(token, ownerAddress, web3);
}

module.exports = runScript;
