import React from 'react';

import DeleteAlbum from '../../src/components/DeleteAlbum/presenter';
import { STATE_STATUSES } from '../../src/constants';
import render from '../utils';
import { mockAdminData } from '../mocks';

const { artist, title } = mockAdminData[0];
const handleSubmit = () => jest.fn;

test('DeleteAlbum renders with data', () => {
  const { getByText } = render(
    <DeleteAlbum
      data={mockAdminData[0]}
      onSubmit={handleSubmit}
      status={STATE_STATUSES.SUCCESS}
    />,
  );
  const titleHeader = getByText('Delete Album');
  const confirmText = getByText(`Are you sure you want to delete ${artist} – ${title}?`);
  const cancelButton = getByText('Cancel');
  const deleteButton = getByText('Delete');

  expect(titleHeader).toBeInTheDocument();
  expect(confirmText).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
