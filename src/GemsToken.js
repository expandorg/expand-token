const contract = require('truffle-contract');
const Big = require('bignumber.js');
const tokenArtifacts = require('../build/contracts/GemsToken.json');

const statusError = new Error('Transaction rejected');
statusError.name = 'StatusError';

function validateAddress(address, name) {
  if (address.length !== 42 || address.slice(0, 2) !== '0x') {
    throw new Error(`Invalid ${name} address`);
  }
}

function validateValue(value) {
  if (value <= 0) {
    throw new Error('Value <= 0');
  }
}

class GemsToken {
  constructor(provider, from) {
    validateAddress(from, 'from');
    this.provider = provider;
    this.from = from;
  }

  init() {
      const tokenContract = contract(tokenArtifacts);
      tokenContract.setProvider(this.provider);
      tokenContract.defaults({
        gas: process.env.GAS_LIMIT,
        from: this.from,
        gasPrice: process.env.GAS_PRICE,
      });

      return new Promise((rslv, rjct) => {
        tokenContract.at(process.env.GEMS_ADDRESS)
          .then((token) => {
            this.token = token;
            rslv();
          })
          .catch((err) => {
            rjct(err);
          });
      });
  }

  /* Views */

  async balanceOf(address) {
    validateAddress(address, 'balance');

    return this.token.balanceOf.call(address);
  }

  async allowance(owner, spender) {
    validateAddress(owner, 'owner');
    validateAddress(spender, 'spender');

    return this.token.allowance.call(owner, spender);
  }

  /* Transactions */

  async transfer(to, value, options) {
    validateAddress(to, 'to');
    validateValue(value);

    const { tx, receipt } = await this.token.transfer(to, value, options);
    if (receipt.status === '0x00') {
      throw statusError;
    }
    return {
      tx,
      expected: {
        name: 'Transfer',
        args: {
          from: this.from.toLowerCase(),
          to: to.toLowerCase(),
          value,
        },
      },
    };
  }

  async transferFrom(from, to, value, options) {
    validateAddress(from, 'from');
    validateAddress(to, 'to');
    validateValue(value);

    const { tx, receipt } = await this.token.transferFrom(from, to, value, options);
    if (receipt.status === '0x00') {
      throw statusError;
    }
    return {
      tx,
      expected: {
        name: 'Transfer',
        args: {
          from: from.toLowerCase(),
          to: to.toLowerCase(),
          value,
        },
      },
    };
  }

  async approve(address, value, options) {
    validateAddress(address, 'approve');
    validateValue(value);

    const { tx, receipt } = await this.token.approve(address, value, options);
    if (receipt.status === '0x00') {
      throw statusError;
    }
    return {
      tx,
      expected: {
        name: 'Approval',
        args: {
          owner: this.from.toLowerCase(),
          spender: address.toLowerCase(),
          value,
        },
      },
    };
  }

  async reclaimToken(address, options) {
    validateAddress(address, 'token');

    const { tx, receipt } = await this.token.reclaimToken(address, options);
    if (receipt.status === '0x00') {
      throw statusError;
    }
    return {
      tx,
      expected: {
        name: 'Transfer',
        args: {
          from: process.env.GEMS_ADDRESS,
          to: process.env.OWNER_ADDRESS,
        },
      },
    };
  }
}

module.exports = {
  GemsToken,
  events: tokenArtifacts.abi.filter((abi) => abi.type && abi.type === 'event'),
};
