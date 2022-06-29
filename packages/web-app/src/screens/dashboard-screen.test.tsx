import React from 'react';
import { screen } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import { renderWithAllProviders } from 'src/test-utils/test-utils';
import DashboardSceeen from './dashboard-screen';

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
  ws.close();
  WS.clean();
});

describe('Profile Screen', () => {
  it('renders', async () => {
    renderWithAllProviders(<DashboardSceeen />);
    const linkElement = screen.getByText(/BTC/);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders realtime values', async () => {
    renderWithAllProviders(<DashboardSceeen />);

    console.log('messages start', ws.messages);

    await ws.connected;

    await ws.nextMessage;

    console.log('messages end', ws.messages);

    expect(screen.getByText(/ETH 1,202.08 USD/i)).toBeInTheDocument();
    expect(screen.getByText(/BTC 20,910.92 USD/i)).toBeInTheDocument();
  });
});
