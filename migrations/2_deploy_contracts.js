const loadEnv = require('../src/loadEnv');
const GemsToken = artifacts.require('./GemsToken');

loadEnv();

module.exports = (deployer, network, accounts) => {
  const ownerAddress = process.env.ENV === 'local' ? accounts[0] : process.env.OWNER_ADDRESS;
  deployer.deploy(GemsToken, { from: ownerAddress });
};
