import FeaturedSongs from '../../src/components/FeaturedSongs/presenter';
import render from '../utils';
import { mockFeaturedSongsData } from '../mocks';

const modal = {
  onCreateOpen: jest.fn,
  onDeleteOpen: jest.fn,
};

test('FeaturedSongs renders with data', () => {
  const { getByText, getByTestId } = render(
    <FeaturedSongs
      data={{ songs: mockFeaturedSongsData }}
      isLoading={false}
      modal={modal}
      refresh={jest.fn}
    />,
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
