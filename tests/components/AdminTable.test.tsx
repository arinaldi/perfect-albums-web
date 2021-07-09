import AdminTable from '../../src/components/AdminTable/presenter';
import { SORT_DIRECTION } from '../../src/constants';
import render from '../utils';
import { mockAdminData } from '../mocks';

const handleSort = () => jest.fn;

test('AdminTable renders with data', () => {
  const { container, getByTestId } = render(
    <AdminTable
      data={mockAdminData}
      direction={SORT_DIRECTION.ASC}
      onSort={handleSort}
      searchText=""
      sort="artist"
    />,
  );
  const firstRow = getByTestId('1');
  const secondRow = getByTestId('2');
  const thirdRow = getByTestId('3');
  const tbody = container.querySelector('tbody') as HTMLTableSectionElement;

  expect(firstRow).toBeInTheDocument();
  expect(secondRow).toBeInTheDocument();
  expect(thirdRow).toBeInTheDocument();
  expect(tbody.children).toHaveLength(3);
});
