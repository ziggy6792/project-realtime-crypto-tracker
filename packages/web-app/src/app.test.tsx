import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import App from './app';

describe('Profile Screen', () => {
  it('renders', async () => {
    render(<App />);
    const linkElement = screen.getByText(/BTC/);
    expect(linkElement).toBeInTheDocument();
  });

  it.only('renders realtime values', async () => {
    render(<App />);

    const server = new WS(process.env.REACT_APP_API_GSG_INTERNAL_WS_URL);

    // real clients can connect
    // const client = new WebSocket(process.env.REACT_APP_API_GSG_INTERNAL_WS_URL);
    await server.connected; // wait for the server to have established the connection

    server.on('message', () => {
      console.log('Message!');
    });

    server.on('connection', () => {
      console.log('Connection!');
    });

    server.send(
      JSON.stringify({
        result: {
          type: 'started',
        },
        elapsedMs: 11,
        context: {},
      })
    );
    server.send(JSON.stringify({ id: 4, result: { type: 'data', data: { json: { fromSymbol: 'BTC', toSymbol: 'USD', ammount: 20701.07 } } } }));

    await waitFor(() => {
      expect(screen.getByDisplayValue(/20701.07/i)).toBeInTheDocument();
    });
  });
});
