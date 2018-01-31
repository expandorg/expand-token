const provider = require('./src/provider');

module.exports = {
  networks: {
    development: {
      provider,
      network_id: '*',
    },
    ropsten: {
      provider,
      network_id: 3,
      from: process.env.OWNER_ADDRESS,
      gas: process.env.GAS_LIMIT,
    },
  },
};
