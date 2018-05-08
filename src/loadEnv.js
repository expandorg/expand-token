const dotenv = require('dotenv');
const { resolve } = require('path');

let env;
switch (process.env.NODE_ENV) {
  case 'production':
    env = 'production';
    break;
  case 'ropsten':
    env = 'ropsten';
    break;
  default:
    env = 'local';
}
const envPath = resolve(__dirname, `../${env}.env`);

function loadEnv() {
  dotenv.config({ path: envPath });
  process.env.ENV = env;
}

module.exports = loadEnv;
