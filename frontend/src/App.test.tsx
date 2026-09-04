import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders the landing page with platform brand and hero elements by default', () => {
    render(<App />);
    expect(screen.getAllByAltText('What They Say')[0]).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Real Feedback/i);
    expect(screen.getByAltText(/What They Say Store Rating Dashboard Overview/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start rating stores/i })).toBeInTheDocument();
  });

  it('renders the login screen when navigating to /login', () => {
    window.history.pushState({}, '', '/login');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sign In');
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders the registration screen when navigating to /register', () => {
    window.history.pushState({}, '', '/register');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Create Account');
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
});
