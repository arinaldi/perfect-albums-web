import AdminTable from '../../src/components/AdminTable/presenter';
import render from '../utils';
import { mockAdminData } from '../mocks';

const handleSort = () => jest.fn;

test('AdminTable renders with data', () => {
  const { container, getByTestId } = render(
    <AdminTable
      data={mockAdminData}
      direction="asc"
      onSort={handleSort}
      searchText=""
      sort="artist"
    />,
  );
  const firstRow = getByTestId('1');
  const secondRow = getByTestId('2');
  const thirdRow = getByTestId('3');
  const tbody = container.querySelector('tbody');

  expect(firstRow).toBeInTheDocument();
  expect(secondRow).toBeInTheDocument();
  expect(thirdRow).toBeInTheDocument();
  expect(tbody.children).toHaveLength(3);
});
