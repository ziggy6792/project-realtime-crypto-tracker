import React from 'react';
import { screen } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import { renderWithAllProviders } from 'src/test-utils/test-utils';
import { HistoricalPrice } from './historical-price';

describe('Historical Price', () => {
  it('renders', async () => {
    renderWithAllProviders(<HistoricalPrice fromSymbol='BTC' />);
    const linkElement = screen.getByText(/BTC/);
    expect(linkElement).toBeInTheDocument();
  });
});
