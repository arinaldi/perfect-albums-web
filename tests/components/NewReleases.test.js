import { MockedProvider } from '@apollo/client/testing';

import NewReleases from '../../src/components/NewReleases/presenter';
import { GET_RELEASES } from '../../src/queries';
import render from '../utils';
import { mockNewReleasesData, releaseLabels } from '../mocks';

const mocks = [
  {
    request: {
      query: GET_RELEASES,
    },
    result: {
      data: {
        releases: mockNewReleasesData,
      },
    },
  },
];

const modal = {
  onCreateOpen: jest.fn,
  onDeleteOpen: jest.fn,
  onEditOpen: jest.fn,
};

test('NewReleases renders with data by date', () => {
  const { getByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <NewReleases
        data={{ releases: mockNewReleasesData }}
        isLoading={false}
        modal={modal}
        refresh={jest.fn}
      />
    </MockedProvider>,
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
