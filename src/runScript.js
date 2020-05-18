const Web3 = require('web3');
const provider = require('../src/provider');
const ExpandToken = require('../src/ExpandToken');

const web3 = new Web3(provider);
const ownerAddress = process.env.ENV === 'local' ? web3.eth.accounts[0] : process.env.OWNER_ADDRESS;

async function runScript(script) {
  const token = new ExpandToken(web3.currentProvider, ownerAddress);
  await token.init();
  await script(token, ownerAddress, web3);
}

module.exports = runScript;
