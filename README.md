# Gems Token

Contains the GemsToken contract and convenience wrappers for executing views and transactions.

## Usage

Add scripts to the `scripts/` directory, using `scripts/template.js` as a guide:

```javascript
const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3) => {
  // Script here
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
```

The `token` instance that's passed to your script has the following `async` methods derived from the contract:

### Views

View methods return the relevant values.

```
balanceOf(address)

allowance(owner, spender)
```

### Transactions

Transactions return logged event on success, and throw errors on failure.

```
transfer(to, value)

transferFrom(from, to, value)

approve(address, value)
```
