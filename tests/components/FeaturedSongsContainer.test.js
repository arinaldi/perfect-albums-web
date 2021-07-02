import { MockedProvider } from '@apollo/client/testing';

import FeaturedSongsContainer from '../../src/components/FeaturedSongs';
import { GET_SONGS } from '../../src/queries';
import render from '../utils';
import { mockFeaturedSongsData } from '../mocks';

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
