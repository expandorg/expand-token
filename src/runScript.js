const Web3 = require('web3');
const Watcher = require('@xlnt/scry-one').default;
const provider = require('../src/provider');
const { GemsToken, events } = require('../src/GemsToken');

const web3 = new Web3(provider);
const ownerAddress = process.env.ENV === 'local' ? web3.eth.accounts[0] : process.env.GEMS_OWNER_ADDRESS;
const watcher = new Watcher(
  process.env.WEB3_PROVIDER,
  events,
  1,
  500,
);

async function runScript(script) {
  const token = new GemsToken(web3.currentProvider, ownerAddress, watcher);
  await token.init();
  await script(token, ownerAddress, web3, watcher);
  watcher.stop();
}

module.exports = runScript;
