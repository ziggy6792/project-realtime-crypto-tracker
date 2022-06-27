import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import App from './app';

let ws: WS;
beforeEach(() => {
  ws = new WS(process.env.REACT_APP_API_GSG_INTERNAL_WS_URL, { jsonProtocol: true });
  ws.on('connection', (mockWebSocket) => {
    mockWebSocket.on('message', (message) => {
      const { id } = JSON.parse(message as string);
      ws.send({ id, result: { type: 'data', data: { json: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 1202.08 } } } });
      ws.send({ id, result: { type: 'data', data: { json: { fromSymbol: 'BTC', toSymbol: 'USD', ammount: 20910.92 } } } });
    });
  });
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

    await ws.nextMessage;

    expect(screen.getByText(/ETH 1,202.08 USD/i)).toBeInTheDocument();
    expect(screen.getByText(/BTC 20,910.92 USD/i)).toBeInTheDocument();
  });
});
