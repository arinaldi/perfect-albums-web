import { FC } from 'react';
import { Box, Table, Thead, Tbody, Th, Tr } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { SORT_DIRECTION } from '../../constants';
import { Album } from '../../utils/types';
import AdminTableRow from '../AdminTable/AdminTableRow';
import AdminTableSkeleton from '../AdminTable/AdminTableSkeleton';

interface Props {
  data: Album[];
  direction: SORT_DIRECTION;
  isLoading: boolean;
  onSort: (value: string) => void;
  searchText?: string;
  sort: string;
}

const getSortIcon = (direction: SORT_DIRECTION) => {
  const { ASC, DESC } = SORT_DIRECTION;

  if (!direction) return '';
  if (direction === ASC)
    return <ArrowUpIcon mr={1} verticalAlign="text-bottom" />;
  if (direction === DESC)
    return <ArrowDownIcon mr={1} verticalAlign="text-bottom" />;
};

const AdminTable: FC<Props> = props => {
  const { data, direction, isLoading, onSort, searchText = '', sort } = props;

  return (
    <Box overflowX="auto">
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th cursor="pointer" onClick={() => onSort('artist')}>
              {sort === 'artist' && getSortIcon(direction)}
              Artist
            </Th>
            <Th cursor="pointer" onClick={() => onSort('title')}>
              {sort === 'title' && getSortIcon(direction)}
              Title
            </Th>
            <Th cursor="pointer" onClick={() => onSort('year')}>
              {sort === 'year' && getSortIcon(direction)}
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
            {data.map(item => (
              <AdminTableRow
                key={item.id}
                item={item}
                searchText={searchText}
              />
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
};

export default AdminTable;
