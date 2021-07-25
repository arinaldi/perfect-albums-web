import { FC } from 'react';
import { Box, Table, Thead, Tbody, Th, Tr } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { SORT_DIRECTION, SORT_VALUE } from '../../constants';
import { Album } from '../../utils/types';
import AdminTableRow from '../AdminTable/AdminTableRow';
import AdminTableSkeleton from '../AdminTable/AdminTableSkeleton';

interface Props {
  data: Album[];
  direction: SORT_DIRECTION;
  isLoading: boolean;
  onSort: (value: SORT_VALUE) => void;
  sort: string;
}

function getSortIcon(direction: SORT_DIRECTION) {
  const { ASC, DESC } = SORT_DIRECTION;

  if (!direction) return '';
  if (direction === ASC)
    return <ArrowUpIcon mr={1} verticalAlign="text-bottom" />;
  if (direction === DESC)
    return <ArrowDownIcon mr={1} verticalAlign="text-bottom" />;
}

const AdminTable: FC<Props> = (props) => {
  const { data, direction, isLoading, onSort, sort } = props;
  const { ARTIST, TITLE, YEAR } = SORT_VALUE;

  return (
    <Box overflowX="auto">
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th cursor="pointer" onClick={() => onSort(ARTIST)}>
              {sort === ARTIST ? getSortIcon(direction) : null}
              Artist
            </Th>
            <Th cursor="pointer" onClick={() => onSort(TITLE)}>
              {sort === TITLE ? getSortIcon(direction) : null}
              Title
            </Th>
            <Th cursor="pointer" onClick={() => onSort(YEAR)}>
              {sort === YEAR ? getSortIcon(direction) : null}
              Year
            </Th>
            <Th>CD</Th>
            <Th>AotD</Th>
            <Th>Favorite</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        {isLoading ? (
          <AdminTableSkeleton />
        ) : (
          <Tbody>
            {data.map((item) => (
              <AdminTableRow key={item.id} item={item} />
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
};

export default AdminTable;
