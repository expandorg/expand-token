const contract = require('truffle-contract');
const Big = require('bignumber.js');
const Watcher = require('@xlnt/scry-one').default;
const tokenArtifacts = require('../build/contracts/GemsToken.json');

const eventAbis = tokenArtifacts.abi.filter((abi) => abi.type && abi.type === 'event');

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
    this.watcher = new Watcher(
      process.env.WEB3_PROVIDER,
      eventAbis,
      1,
      500,
    );
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

  close() {
    this.watcher.stop();
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

  async transfer(to, value) {
    validateAddress(to, 'to');
    validateValue(value);

    const { tx, receipt } = await this.token.transfer(to, value);
    if (receipt.status === '0x00') {
      throw new Error('Transaction rejected');
    }

    const log = await this.watcher.scry(tx, 'Transfer');
    if (log.args.from.toLowerCase() !== this.from.toLowerCase()) {
      throw new Error(`Unexpected from address: ${log.args.from}`);
    }
    if (log.args.to.toLowerCase() !== to.toLowerCase()) {
      throw new Error(`Unexpected to address: ${log.args.to}`);
    }
    if (!new Big(log.args.value).eq(value)) {
      throw new Error(`Unexpected value: ${log.args.value}`);
    }

    return [log];
  }

  async transferFrom(from, to, value) {
    validateAddress(from, 'from');
    validateAddress(to, 'to');
    validateValue(value);

    const { tx, receipt } = await this.token.transferFrom(from, to, value);
    if (receipt.status === '0x00') {
      throw new Error('Transaction rejected');
    }

    const log = await this.watcher.scry(tx, 'Transfer');
    if (log.args.from.toLowerCase() !== from.toLowerCase()) {
      throw new Error(`Unexpected from address: ${log.args.from}`);
    }
    if (log.args.to.toLowerCase() !== to.toLowerCase()) {
      throw new Error(`Unexpected to address: ${log.args.to}`);
    }
    if (!new Big(log.args.value).eq(value)) {
      throw new Error(`Unexpected value: ${log.args.value}`);
    }

    return [log];
  }

  async approve(address, value) {
    validateAddress(address, 'approve');
    validateValue(value);

    const { tx, receipt } = await this.token.approve(address, value);
    if (receipt.status === '0x00') {
      throw new Error('Transaction rejected');
    }

    const log = await this.watcher.scry(tx, 'Approval');
    if (log.args.owner.toLowerCase() !== this.from.toLowerCase()) {
      throw new Error(`Unexpected owner address: ${log.args.from}`);
    }
    if (log.args.spender.toLowerCase() !== address.toLowerCase()) {
      throw new Error(`Unexpected spender address: ${log.args.spender}`);
    }
    if (!new Big(log.args.value).eq(value)) {
      throw new Error(`Unexpected value: ${log.args.value}`);
    }

    return [log];
  }

  async reclaimToken(address) {
    validateAddress(address, 'token');

    const { tx, receipt } = await this.token.reclaimToken(address);
    if (receipt.status === '0x00') {
      throw new Error('Transaction rejected');
    }

    const log = await this.watcher.scry(tx, 'Transfer');
    if (log.args.from.toLowerCase() !== process.env.GEMS_ADDRESS) {
      throw new Error(`Unexpected from address: ${log.args.from}`);
    }
    if (log.args.to.toLowerCase() !== process.env.OWNER_ADDRESS) {
      throw new Error(`Unexpected to address: ${log.args.to}`);
    }

    return [log];
  }
}

module.exports = GemsToken;
