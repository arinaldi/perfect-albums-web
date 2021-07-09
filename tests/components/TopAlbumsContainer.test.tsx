import { MockedProvider } from '@apollo/client/testing';

import TopAlbumsContainer from '../../src/components/TopAlbums';
import { GET_FAVORITES } from '../../src/queries';
import render from '../utils';
import { mockTopAlbumsData } from '../mocks';

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
