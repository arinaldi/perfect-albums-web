import DeleteDataModal from '../../src/components/DeleteDataModal/presenter';
import { MODAL_DATA_TYPES } from '../../src/constants';
import { mockFeaturedSongsData } from '../mocks';
import render from '../utils';

const data = mockFeaturedSongsData[0];

test('DeleteDataModal renders with data', () => {
  const { getByText } = render(
    <DeleteDataModal
      data={data}
      dataType={MODAL_DATA_TYPES.SONG}
      isDeleting={false}
      isOpen
      onClose={jest.fn}
      onDelete={jest.fn}
    />,
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(
    `Are you sure you want to delete ${data.artist} – ${data.title}?`,
  );
  const closeButton = getByText('Close');
  const deleteButton = getByText('Delete');

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
  expect(closeButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
