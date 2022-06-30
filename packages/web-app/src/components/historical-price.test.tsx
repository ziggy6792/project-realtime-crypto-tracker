import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import { renderWithAllProviders } from 'src/test-utils/test-utils';
import { HistoricalPrice } from './historical-price';

describe('Historical Price', () => {
  it('renders', async () => {
    renderWithAllProviders(<HistoricalPrice fromSymbol='BTC' />);

    await waitFor(() => {
      expect(screen.getByText(/Price in USD/)).toBeInTheDocument();
    });
  });
});
