import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WordSelection from './WordSelection';

describe('<WordSelection />', () => {
  test('it should mount', () => {
    render(<WordSelection />);
    
    const wordSelection = screen.getByTestId('WordSelection');

    expect(wordSelection).toBeInTheDocument();
  });
});