import { render } from '@testing-library/react';

import DeleteDataModal from '../../src/components/DeleteDataModal/presenter';
import { mockFeaturedSongsData } from '../mocks';

const { artist, title } = mockFeaturedSongsData[0];
const handleClose = () => jest.fn;
const handleDelete = () => jest.fn;

test('DeleteDataModal renders with data', () => {
  const { getByText } = render(
    <DeleteDataModal
      artist={artist}
      dataType="Song"
      error=""
      isDeleting={false}
      isOpen
      onClose={handleClose}
      onDelete={handleDelete}
      title={title}
    />,
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);
  const closeButton = getByText('Close');
  const deleteButton = getByText('Delete');

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
  expect(closeButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
