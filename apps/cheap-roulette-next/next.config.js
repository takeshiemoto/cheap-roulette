// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = withNx({
  env: {
    PROD_API_URL: process.env.PROD_API_URL,
    DEV_API_URL: process.env.DEV_API_URL,
  },
});
