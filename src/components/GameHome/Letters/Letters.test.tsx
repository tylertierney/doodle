import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Letters from './Letters';

describe('<Letters />', () => {
  test('it should mount', () => {
    render(<Letters />);
    
    const letters = screen.getByTestId('Letters');

    expect(letters).toBeInTheDocument();
  });
});