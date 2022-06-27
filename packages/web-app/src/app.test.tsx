import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import App from './app';

let ws: WS;
beforeEach(() => {
  ws = new WS(process.env.REACT_APP_API_GSG_INTERNAL_WS_URL, { jsonProtocol: true });
});
afterEach(() => {
  WS.clean();
});

describe('Profile Screen', () => {
  it('renders', async () => {
    render(<App />);
    const linkElement = screen.getByText(/BTC/);
    expect(linkElement).toBeInTheDocument();
  });

  it.only('renders realtime values', async () => {
    render(<App />);

    await ws.connected;

    await expect(ws).toReceiveMessage({
      id: 1,
      jsonrpc: '2.0',
      method: 'subscription',
      params: { input: { json: null, meta: { values: ['undefined'] } }, path: 'onUpdatePrice' },
    });

    ws.send({ id: 1, result: { type: 'data', data: { json: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 1202.08 } } } });

    expect(screen.getByText(/ETH 1,202.08 USD/i)).toBeInTheDocument();
  });
});
