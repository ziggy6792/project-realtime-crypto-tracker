/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const package = require('./package.json');
const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  displayName: package.name,
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['./src/test-utils/setup-tests.ts'],
};
