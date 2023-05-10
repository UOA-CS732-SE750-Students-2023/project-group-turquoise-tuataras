import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AuthContextProvider } from '../context/AuthContext';
import { it, describe, expect } from 'vitest';

describe('AuthContextProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <AuthContextProvider>
        <div>Child Component</div>
      </AuthContextProvider>
    );

    expect(getByText('Child Component')).toBeInTheDocument();
  });


});
