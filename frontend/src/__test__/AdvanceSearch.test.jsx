import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { it, describe, expect } from 'vitest';
import AdvanceSearch from '../components/AdvanceSearch.jsx';

const mockAxios = new MockAdapter(axios);

const mockApiResponse = [
  {
    id: 1,
    title: 'Recipe 1',
    image: 'image1.jpg',
  },
  {
    id: 2,
    title: 'Recipe 2',
    image: 'image2.jpg',
  },
];

describe('AdvanceSearch', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should render search results after fetching the API', async () => {
    mockAxios.onGet(`${process.env.VITE_API_BASE_URL}/recipes/search`).reply(200, mockApiResponse);

    render(<AdvanceSearch />);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const recipeCards = screen.getAllByRole('link', { name: /Recipe \d/i });
      expect(recipeCards).toHaveLength(2);
    });
  });
});
