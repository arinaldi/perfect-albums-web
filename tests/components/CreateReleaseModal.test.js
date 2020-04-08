import React from 'react';
import { render } from '@testing-library/react';

import CreateReleaseModal from '../../src/components/CreateReleaseModal/presenter';
import { mockNewReleasesData } from '../mocks';

const release = mockNewReleasesData[0];
const { artist, title } = release;

test('CreateReleaseModal renders with data', () => {
  const { getByText, getAllByText, getByLabelText } = render(
    <CreateReleaseModal
      isOpen
      header='Create'
      release={release}
      isValidated
      isSaving={false}
      handleChange={jest.fn}
      handleClose={jest.fn}
      handleSubmit={jest.fn}
      error=''
    />,
  );
  const titleHeader = getByText('Create Release');
  const artistInput = getByLabelText('Artist');
  const titleInput = getByLabelText('Title');
  const closeButtons = getAllByText('Close');
  const saveButton = getByText('Save');

  expect(titleHeader).toBeInTheDocument();
  expect(artistInput.value).toBe(artist);
  expect(titleInput.value).toBe(title);
  expect(closeButtons[0]).toBeInTheDocument();
  expect(closeButtons[1]).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
