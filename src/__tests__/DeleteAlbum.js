import React from 'react';

import DeleteAlbum from '../components/DeleteAlbum/presenter';

import render from '../__test-utils__';
import { mockAdminData } from '../__mocks__';
import { STATE_STATUSES } from '../constants';

const { artist, title } = mockAdminData[0];

test('DeleteAlbum renders with data', () => {
  const { getByText } = render(
    <DeleteAlbum
      data={mockAdminData[0]}
      handleSubmit={jest.fn}
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
