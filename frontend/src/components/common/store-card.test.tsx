import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StoreCard } from './store-card';
import type { Store } from '../../types/store';
import { StoresApi } from '../../api/stores.api';

const mockStore: Store = {
  id: 'store-123',
  name: 'Shubham Super Market',
  address: 'Pune Maharashtra India',
  overallRating: 4.6,
  ratingCount: 24,
  myRating: null,
  recentRatings: [
    { userId: 'user-1', userName: 'Ananya Sharma', value: 5 },
    { userId: 'user-2', userName: 'Rahul Kulkarni', value: 4 },
    { userId: 'user-3', userName: 'Priya Mehta', value: 5 },
  ],
};

describe('StoreCard', () => {
  it('renders stock image, store identity, reputation, and does not show store email', () => {
    const handleRatingSubmit = vi.fn();
    render(<StoreCard store={mockStore} onRatingSubmit={handleRatingSubmit} />);

    // Stock image
    const image = screen.getByAltText('Shubham Super Market');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('/stores/store-'));

    // Identity & reputation
    expect(screen.getByText('Shubham Super Market')).toBeInTheDocument();
    expect(screen.getByText('Pune Maharashtra India')).toBeInTheDocument();
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
    expect(screen.getAllByText(/24 ratings/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText('4.6')[0]).toBeInTheDocument();
  });

  it('shows other people ratings after clicking the ratings button', async () => {
    vi.spyOn(StoresApi, 'getStoreRatings').mockResolvedValue([
      { userId: 'user-1', userName: 'Ananya Sharma', value: 5, createdAt: '2026-09-01T10:00:00Z' },
      { userId: 'user-2', userName: 'Rahul Kulkarni', value: 4, createdAt: '2026-09-02T10:00:00Z' },
    ]);

    const handleRatingSubmit = vi.fn();
    render(<StoreCard store={mockStore} onRatingSubmit={handleRatingSubmit} />);

    // Initially, other people's ratings list is not shown on the card face
    expect(screen.queryByText('Ananya Sharma')).not.toBeInTheDocument();

    // Click the customer ratings button
    const ratingsBtn = screen.getByRole('button', {
      name: /view 24 customer ratings for shubham super market/i,
    });
    fireEvent.click(ratingsBtn);

    // Modal dialog opens revealing other people's ratings
    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /ratings for shubham super market/i }),
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Ananya Sharma')).toBeInTheDocument();
    expect(screen.getByText('Rahul Kulkarni')).toBeInTheDocument();
    expect(screen.getByText('AS')).toBeInTheDocument();
    expect(screen.getByText('RK')).toBeInTheDocument();
  });

  it('allows user to select and submit a rating', () => {
    const handleRatingSubmit = vi.fn();
    render(<StoreCard store={mockStore} onRatingSubmit={handleRatingSubmit} />);

    const fourStarBtn = screen.getByRole('radio', { name: /4 star/i });
    fireEvent.click(fourStarBtn);

    const submitBtn = screen.getByRole('button', { name: /submit 4 \/ 5/i });
    fireEvent.click(submitBtn);

    expect(handleRatingSubmit).toHaveBeenCalledWith('store-123', 4);
  });
});
