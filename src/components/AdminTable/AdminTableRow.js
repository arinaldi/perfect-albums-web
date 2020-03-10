import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import { ICONS } from '../../constants';

const { CHECK } = ICONS;
const margin = 2;

const AdminTableRow = (props) => {
  const { item, searchText } = props;
  const history = useHistory();
  const { id, artist, title, year, cd, aotd, favorite } = item;

  const navigate = path => {
    history.push(`/${path}/${id}?${searchText}`);
  };

  return (
    <tr data-testid={id}>
      <td>{artist}</td>
      <td>{title}</td>
      <td>{year}</td>
      <td>{cd && CHECK}</td>
      <td>{aotd && CHECK}</td>
      <td>{favorite && CHECK}</td>
      <td>
        <Button
          variant='outline-dark'
          size='sm'
          onClick={() => navigate('edit')}
          style={{ margin }}
        >
          Edit
        </Button>
        <Button
          variant='outline-dark'
          size='sm'
          onClick={() => navigate('delete')}
          style={{ margin }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

AdminTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  searchText: PropTypes.string,
};

AdminTableRow.defaultProps = {
  searchText: '',
};

export default AdminTableRow;
