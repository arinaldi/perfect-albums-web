import React from 'react';
import { render } from '@testing-library/react';

import DeleteDataModal from '../../src/components/DeleteDataModal/presenter';
import { mockFeaturedSongsData } from '../mocks';

const { artist, title } = mockFeaturedSongsData[0];

test('DeleteDataModal renders with data', () => {
  const handleClose = () => jest.fn;
  const handleDelete = () => jest.fn;
  const { getByText } = render(
    <DeleteDataModal
      isOpen
      dataType='Song'
      artist={artist}
      title={title}
      isDeleting={false}
      onClose={handleClose}
      onDelete={handleDelete}
      error=''
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
