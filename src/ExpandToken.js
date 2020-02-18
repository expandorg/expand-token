const contract = require('truffle-contract');
const tokenArtifacts = require('../build/contracts/ExpandToken.json');

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

class ExpandToken {
  constructor(provider, from) {
    validateAddress(from, 'from');
    this.provider = provider;
    this.from = from;
  }

  async init() {
    const tokenContract = contract(tokenArtifacts);
    tokenContract.setProvider(this.provider);
    tokenContract.defaults({
      gas: process.env.GAS_LIMIT,
      from: this.from,
      gasPrice: process.env.GAS_PRICE,
    });
    this.token = await tokenContract.at(process.env.EXPAND_ADDRESS);
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

    const { logs } = await this.token.transfer(to, value);

    if (logs.length !== 1) {
      throw new Error(`Unexpected event logs: ${logs.toString()}`);
    }
    const log = logs[0];
    if (log.event !== 'Transfer') {
      throw new Error(`Unexpected event log: ${log.toString()}`);
    }
    if (log.args.from !== this.from.toLowerCase()) {
      throw new Error(`Unexpected from address: ${log.args.from}`);
    }
    if (log.args.to !== to.toLowerCase()) {
      throw new Error(`Unexpected to address: ${log.args.to}`);
    }
    if (!log.args.value.equals(value)) {
      throw new Error(`Unexpected value: ${log.args.value}`);
    }

    return logs;
  }

  async transferFrom(from, to, value) {
    validateAddress(from, 'from');
    validateAddress(to, 'to');
    validateValue(value);

    const { logs } = await this.token.transferFrom(from, to, value);

    if (logs.length !== 1) {
      throw new Error(`Unexpected event logs: ${logs.toString()}`);
    }
    const log = logs[0];
    if (log.event !== 'Transfer') {
      throw new Error(`Unexpected event log: ${log.toString()}`);
    }
    if (log.args.from !== from.toLowerCase()) {
      throw new Error(`Unexpected from address: ${log.args.from}`);
    }
    if (log.args.to !== to.toLowerCase()) {
      throw new Error(`Unexpected to address: ${log.args.to}`);
    }
    if (!log.args.value.equals(value)) {
      throw new Error(`Unexpected value: ${log.args.value}`);
    }

    return logs;
  }

  async approve(address, value) {
    validateAddress(address, 'approve');
    validateValue(value);

    const { logs } = await this.token.approve(address, value);

    if (logs.length !== 1) {
      throw new Error(`Unexpected event logs: ${logs.toString()}`);
    }
    const log = logs[0];
    if (log.event !== 'Approval') {
      throw new Error(`Unexpected event log: ${log.toString()}`);
    }
    if (log.args.owner !== this.from.toLowerCase()) {
      throw new Error(`Unexpected owner address: ${log.args.from}`);
    }
    if (log.args.spender !== address.toLowerCase()) {
      throw new Error(`Unexpected spender address: ${log.args.spender}`);
    }
    if (!log.args.value.equals(value)) {
      throw new Error(`Unexpected value: ${log.args.value}`);
    }

    return logs;
  }

  async reclaimToken(address) {
    validateAddress(address, 'token');

    const { logs } = await this.token.reclaimToken(address);
    if (logs.length !== 1) {
      throw new Error(`Unexpected event logs: ${logs.toString()}`);
    }
    const log = logs[0];
    if (log.event !== 'Transfer') {
      throw new Error(`Unexpected event log: ${log.toString()}`);
    }
    if (log.args.from !== process.env.EXPAND_ADDRESS) {
      throw new Error(`Unexpected from address: ${log.args.from}`);
    }
    if (log.args.to !== process.env.OWNER_ADDRESS) {
      throw new Error(`Unexpected to address: ${log.args.to}`);
    }

    return logs;
  }
}

module.exports = ExpandToken;