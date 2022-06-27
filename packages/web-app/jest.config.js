/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json');
const base = require('../../jest.config.base.js');
const package = require('./package.json');

module.exports = {
  ...base,
  displayName: package.name,
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./src/test-utils/setup-tests.ts'],
  testEnvironment: 'jsdom',
};
