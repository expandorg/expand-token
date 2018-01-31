const { fromV3 } = require('ethereumjs-wallet');
const { readFileSync } = require('fs');
const WalletProvider = require('truffle-wallet-provider');
const Web3 = require('web3');
const loadEnv = require('../src/loadEnv');
const GemsToken = require('../src/GemsToken');

loadEnv();

let provider;
if (process.env.ENV === 'local') {
  provider = new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER);
} else {
  const keyfilePath = process.env.OWNER_KEYFILE;
  const keyfile = readFileSync(keyfilePath);
  const wallet = fromV3(keyfile.toString(), process.env.OWNER_PASSWORD);
  provider = new WalletProvider(wallet, process.env.WEB3_PROVIDER);
}
const web3 = new Web3(provider);
const ownerAddress = process.env.ENV === 'local' ? web3.eth.accounts[0] : process.env.OWNER_ADDRESS;

async function runScript(script) {
  const token = new GemsToken(web3.currentProvider, ownerAddress);
  await token.init();
  await script(token, ownerAddress, web3);
}

module.exports = runScript;