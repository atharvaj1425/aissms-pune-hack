import { render, screen } from '@testing-library/react';
import HomePage from '../src/pages/Homepage/HomePage.jsx';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('HomePage Component Tests', () => {
  it('should render the carousel with correct titles', () => {
    render(<HomePage />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Our Impact')).toBeInTheDocument();
    expect(screen.getByText('Join The Movement')).toBeInTheDocument();
  });

  it('should fetch leaderboard data on mount', async () => {
    axios.get.mockResolvedValueOnce({
      data: { data: [{ name: 'John Doe', donations: 10 }] },
    });

    render(<HomePage />);
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/v1/leaderboard/top-individual-donors`
    );
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/v1/leaderboard/top-restaurant-donors`
    );
  });
});