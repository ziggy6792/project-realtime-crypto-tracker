import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

describe('Profile Screen', () => {
  it('renders', async () => {
    render(<App />);
    const linkElement = screen.getByText(/BTC/);
    expect(linkElement).toBeInTheDocument();
  });
});
