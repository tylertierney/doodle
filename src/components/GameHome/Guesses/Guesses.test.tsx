import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Guesses from './Guesses';

describe('<Guesses />', () => {
  test('it should mount', () => {
    render(<Guesses />);
    
    const guesses = screen.getByTestId('Guesses');

    expect(guesses).toBeInTheDocument();
  });
});