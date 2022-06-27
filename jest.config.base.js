// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {},
  collectCoverageFrom: [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!**/dist/**',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/test/**',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
  transformIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
  watchPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
  coverageProvider: 'v8',
  testEnvironment: 'node',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['/dist/', '/build/'],

  collectCoverage: false,
};
