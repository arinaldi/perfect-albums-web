import React from 'react';

import NewReleases from '../components/NewReleases/presenter';
import render from '../__test-utils__';
import { mockNewReleasesData, releaseLabels } from '../__mocks__';
import { STATE_STATUSES } from '../constants';

test('NewReleases renders with data by year', () => {
  const { getByText, getByTestId } = render(
    <NewReleases
      cancel={jest.fn}
      data={mockNewReleasesData}
      error={null}
      handleCreateOpen={jest.fn}
      handleDeleteOpen={jest.fn}
      refresh={jest.fn}
      status={STATE_STATUSES.SUCCESS}
    />,
  );
  const titleHeader = getByText('New Releases');
  const year91Header = getByText(releaseLabels.one);
  const year99Header = getByText(releaseLabels.two);
  const year91List = getByTestId(`list-${releaseLabels.one}`);
  const year99List = getByTestId(`list-${releaseLabels.two}`);

  expect(titleHeader).toBeInTheDocument();
  expect(year91Header).toBeInTheDocument();
  expect(year99Header).toBeInTheDocument();
  expect(year91List.children).toHaveLength(2);
  expect(year99List.children).toHaveLength(1);
});
