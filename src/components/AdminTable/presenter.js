import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { SORT_DIRECTION } from '../../constants';
import AdminTableRow from './AdminTableRow';

const getSortIcon = (direction) => {
  const { ASC, DESC } = SORT_DIRECTION;
  if (!direction) return '';
  if (direction === ASC) return <ArrowUpIcon mr={1} verticalAlign='text-bottom' />;
  if (direction === DESC) return <ArrowDownIcon mr={1} verticalAlign='text-bottom' />;
};

const AdminTable = (props) => {
  const {
    data,
    direction,
    onSort,
    searchText,
    sort,
  } = props;

  return (
    <Box overflowX='auto'>
      <Table size='sm' variant='striped'>
        <Thead>
          <Tr>
            <Th
              data-value='artist'
              cursor='pointer'
              onClick={onSort}
            >
              {sort === 'artist' && getSortIcon(direction)}
              Artist
            </Th>
            <Th
              data-value='title'
              cursor='pointer'
              onClick={onSort}
            >
              {sort === 'title' && getSortIcon(direction)}
              Title
            </Th>
            <Th
              data-value='year'
              cursor='pointer'
              onClick={onSort}
            >
              {sort === 'year' && getSortIcon(direction)}
              Year
            </Th>
            <Th>CD</Th>
            <Th>AotD</Th>
            <Th>Favorite</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <AdminTableRow
              key={item.id}
              item={item}
              searchText={searchText}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

AdminTable.propTypes = {
  data: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  sort: PropTypes.string.isRequired,
};

AdminTable.defaultProps = {
  searchText: '',
};

export default AdminTable;
