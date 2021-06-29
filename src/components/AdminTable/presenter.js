import React from 'react';
import Table from 'react-bootstrap/Table';
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
    searchText,
    sort,
    direction,
    handleSort,
  } = props;

  return (
    <Table responsive striped hover size='sm'>
      <thead>
        <tr>
          <th
            data-value='artist'
            onClick={handleSort}
          >
            {sort === 'artist' && getSortIcon(direction)}
            Artist
          </th>
          <th
            data-value='title'
            onClick={handleSort}
          >
            {sort === 'title' && getSortIcon(direction)}
            Title
          </th>
          <th
            data-value='year'
            onClick={handleSort}
          >
            {sort === 'year' && getSortIcon(direction)}
            Year
          </th>
          <th>CD</th>
          <th>AotD</th>
          <th>Favorite</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <AdminTableRow
            key={item.id}
            item={item}
            searchText={searchText}
          />
        ))}
      </tbody>
    </Table>
  );
};

AdminTable.propTypes = {
  data: PropTypes.array.isRequired,
  searchText: PropTypes.string,
  sort: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
};

AdminTable.defaultProps = {
  searchText: '',
};

export default AdminTable;
