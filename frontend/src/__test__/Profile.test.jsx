import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext';
import { it, expect, describe } from 'vitest';
import Profile from '../components/Profile.jsx';

describe('Profile', () => {
  it('should render Profile component correctly', () => {
    const mockUser = { username: 'testUser' };
    const mockIntolerances = ['testIntolerance1', 'testIntolerance2'];
    const mockLocalStorage = {
      getItem: vi.fn((key) => {
        switch (key) {
          case 'user':
            return JSON.stringify(mockUser);
          case 'testUser_intolerances':
            return JSON.stringify(mockIntolerances);
          default:
            return null;
        }
      }),
      setItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    const { getByText, getAllByText } = render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Profile />
      </AuthContext.Provider>
    );
    

    const editAccountText = getByText("Edit Account");
    const intolerancesText = getByText("Intolerances");
  
    expect(editAccountText).toBeInTheDocument();
    expect(intolerancesText).toBeInTheDocument();
  
    const submitButtons = getAllByText(/submit/i);
    expect(submitButtons.length).toBe(2);
  });
});
