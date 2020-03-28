import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import render from '../__test-utils__';
import { mockFeaturedSongsData } from '../__mocks__';

import FeaturedSongsContainer from '../components/FeaturedSongs';
import { GET_SONGS } from '../queries';

const mocks = [
  {
    request: {
      query: GET_SONGS,
    },
    result: {
      data: {
        songs: mockFeaturedSongsData,
      },
    },
  },
];

test('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FeaturedSongsContainer />
    </MockedProvider>,
  );
});
