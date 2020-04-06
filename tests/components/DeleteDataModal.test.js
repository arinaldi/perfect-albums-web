import React from 'react';
import { render } from '@testing-library/react';

import DeleteDataModal from '../../src/components/DeleteDataModal/presenter';
import { mockFeaturedSongsData } from '../mocks';

const { artist, title } = mockFeaturedSongsData[0];

test('DeleteDataModal renders with data', () => {
  const { getByText, getAllByText } = render(
    <DeleteDataModal
      isOpen
      dataType='Song'
      artist={artist}
      title={title}
      isDeleting={false}
      handleClose={jest.fn}
      handleDelete={jest.fn}
      error=''
    />,
  );
  const titleHeader = getByText('Delete Song');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);
  const closeButtons = getAllByText('Close');
  const deleteButton = getByText('Delete');

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
  expect(closeButtons[0]).toBeInTheDocument();
  expect(closeButtons[1]).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
