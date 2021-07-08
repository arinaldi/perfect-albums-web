import { MockedProvider } from '@apollo/client/testing';

import FeaturedSongs from '../../src/components/FeaturedSongs/presenter';
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

const modal = {
  onCreateOpen: jest.fn,
  onDeleteOpen: jest.fn,
};

test('FeaturedSongs renders with data', () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FeaturedSongs
        data={{ songs: mockFeaturedSongsData }}
        isLoading={false}
        modal={modal}
        refresh={jest.fn}
      />
    </MockedProvider>,
  );
  const titleHeader = getByText('Featured Songs');
  const nirvanaCard = getByText('Smells Like Teen Spirit');
  const pearlJamCard = getByText('Even Flow');
  const cardRow = getByTestId('card-row');

  expect(titleHeader).toBeInTheDocument();
  expect(nirvanaCard).toBeInTheDocument();
  expect(pearlJamCard).toBeInTheDocument();
  expect(cardRow.children).toHaveLength(3);
});
