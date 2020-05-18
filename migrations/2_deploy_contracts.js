
const loadEnv = require('../src/loadEnv');
const ExpandToken = artifacts.require('./ExpandToken');

loadEnv();

module.exports = (deployer, network, accounts) => {
  const ownerAddress = process.env.ENV === 'local' ? accounts[0] : process.env.OWNER_ADDRESS;
  deployer.deploy(ExpandToken, { from: ownerAddress });
};
