import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuesserInterface from './GuesserInterface';

describe('<GuesserInterface />', () => {
  test('it should mount', () => {
    render(<GuesserInterface />);
    
    const guesserInterface = screen.getByTestId('GuesserInterface');

    expect(guesserInterface).toBeInTheDocument();
  });
});