import { render } from '@testing-library/react';

import DeleteDataModal from '../../src/components/DeleteDataModal/presenter';
import { ModalDataType } from '../../src/utils/types';
import { mockFeaturedSongsData } from '../mocks';

const data = mockFeaturedSongsData[0];
const handleClose = () => jest.fn;
const handleDelete = () => jest.fn;

test('DeleteDataModal renders with data', () => {
  const { getByText } = render(
    <DeleteDataModal
      data={data}
      dataType={ModalDataType.song}
      error=""
      isDeleting={false}
      isOpen
      onClose={handleClose}
      onDelete={handleDelete}
    />,
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${data.artist} – ${data.title}?`);
  const closeButton = getByText('Close');
  const deleteButton = getByText('Delete');

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
  expect(closeButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
