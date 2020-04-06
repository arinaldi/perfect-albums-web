import React from 'react';
import { render } from '@testing-library/react';

import CreateSongModal from '../../src/components/CreateSongModal/presenter';
import { mockFeaturedSongsData } from '../mocks';

const { artist, title, link } = mockFeaturedSongsData[0];

test('CreateSongModal renders with data', () => {
  const { getByText, getAllByText, getByLabelText } = render(
    <CreateSongModal
      isOpen
      song={mockFeaturedSongsData[0]}
      isValidated
      isSaving={false}
      handleChange={jest.fn}
      handleClose={jest.fn}
      handleSubmit={jest.fn}
      error=''
    />,
  );
  const titleHeader = getByText('Create Song');
  const artistInput = getByLabelText('Artist');
  const titleInput = getByLabelText('Title');
  const linkInput = getByLabelText('Link');
  const closeButtons = getAllByText('Close');
  const saveButton = getByText('Save');

  expect(titleHeader).toBeInTheDocument();
  expect(artistInput.value).toBe(artist);
  expect(titleInput.value).toBe(title);
  expect(linkInput.value).toBe(link);
  expect(closeButtons[0]).toBeInTheDocument();
  expect(closeButtons[1]).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
