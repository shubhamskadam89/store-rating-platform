import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the platform title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Store Rating Platform');
  });

  it('increments count on button click', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    await user.click(button);
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
  });
});
