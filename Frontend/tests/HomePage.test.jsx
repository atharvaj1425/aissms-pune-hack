import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import HomePage from '../src/pages/Homepage/HomePage.jsx';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('HomePage Component Tests', () => {

  it('should render the carousel with correct titles', async () => {
    await act(async () => {
      render(<HomePage />);
    });

    expect(screen.getByText((text) => text.includes('About Us'))).toBeInTheDocument();
    // expect(screen.getByText((text) => text.includes('Our Impact'))).toBeInTheDocument();
    // expect(screen.getByText((text) => text.includes('Join The Movement'))).toBeInTheDocument();
  });

  it('should fetch leaderboard data on mount', async () => {
    axios.get.mockResolvedValueOnce({
      data: { data: [{ name: 'John Doe', donations: 10 }] },
    });

    axios.get.mockResolvedValueOnce({
      data: { data: [{ name: 'The Good Food Co.', donations: 20 }] },
    });

    await act(async () => {
      render(<HomePage />);
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/v1/leaderboard/top-individual-donors`
    );
    expect(axios.get).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/api/v1/leaderboard/top-restaurant-donors`
    );
  });
});
