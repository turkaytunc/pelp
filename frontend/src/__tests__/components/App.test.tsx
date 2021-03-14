import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'src/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Rate Restaurant/i);
  expect(linkElement).toBeInTheDocument();
});
