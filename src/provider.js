const { fromV3 } = require('ethereumjs-wallet');
const { readFileSync } = require('fs');
const WalletProvider = require('truffle-wallet-provider');
const Web3 = require('web3');
const loadEnv = require('../src/loadEnv');

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

module.exports = provider;
