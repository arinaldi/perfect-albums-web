import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { CheckIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const margin = 2;

const AdminTableRow = (props) => {
  const { item, searchText } = props;
  const history = useHistory();
  const { id, artist, title, year, cd, aotd, favorite } = item;

  const navigate = path => {
    history.push(`/admin/${path}/${id}?${searchText}`);
  };

  return (
    <tr data-testid={id}>
      <td>{artist}</td>
      <td>{title}</td>
      <td>{year}</td>
      <td>{cd ? <CheckIcon /> : null}</td>
      <td>{aotd ? <CheckIcon /> : null}</td>
      <td>{favorite ? <CheckIcon /> : null}</td>
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
