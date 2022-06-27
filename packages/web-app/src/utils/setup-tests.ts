/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

require('jest-fetch-mock').enableMocks();

process.env.REACT_APP_API_GSG_INTERNAL_URL = 'http://mock/api';
process.env.REACT_APP_API_GSG_INTERNAL_WS_URL = 'ws://mock/api';
