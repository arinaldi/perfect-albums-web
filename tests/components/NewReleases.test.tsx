import NewReleases from '../../src/components/NewReleases/presenter';
import render from '../utils';
import { mockNewReleasesData, releaseLabels } from '../mocks';

const modal = {
  onCreateOpen: jest.fn,
  onDeleteOpen: jest.fn,
  onEditOpen: jest.fn,
};

test('NewReleases renders with data by date', () => {
  const { getByText, getByTestId } = render(
    <NewReleases
      data={{ releases: mockNewReleasesData }}
      isLoading={false}
      modal={modal}
      refresh={jest.fn}
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
