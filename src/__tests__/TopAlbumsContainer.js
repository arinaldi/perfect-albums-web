import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import render from '../__test-utils__';
import { mockTopAlbumsData } from '../__mocks__';

import TopAlbumsContainer from '../components/TopAlbums';
import { GET_FAVORITES } from '../queries';

const mocks = [
  {
    request: {
      query: GET_FAVORITES,
    },
    result: {
      data: {
        favorites: mockTopAlbumsData,
      },
    },
  },
];

test('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TopAlbumsContainer />
    </MockedProvider>,
  );
});
