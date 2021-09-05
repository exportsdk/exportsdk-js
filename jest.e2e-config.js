// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testMatch: ['**/*.e2e-test.ts'],
  testTimeout: 10000,
};
