import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArtistInterface from './ArtistInterface';

describe('<ArtistInterface />', () => {
  test('it should mount', () => {
    render(<ArtistInterface />);
    
    const artistInterface = screen.getByTestId('ArtistInterface');

    expect(artistInterface).toBeInTheDocument();
  });
});