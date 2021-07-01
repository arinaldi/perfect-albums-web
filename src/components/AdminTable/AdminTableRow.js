import { useHistory } from 'react-router-dom';
import {
  Button,
  Td,
  Tr,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const AdminTableRow = (props) => {
  const { item, searchText } = props;
  const history = useHistory();
  const { id, artist, title, year, cd, aotd, favorite } = item;

  const navigate = path => {
    history.push(`/admin/${path}/${id}?${searchText}`);
  };

  return (
    <Tr data-testid={id}>
      <Td>{artist}</Td>
      <Td>{title}</Td>
      <Td>{year}</Td>
      <Td>{cd ? <CheckIcon /> : null}</Td>
      <Td>{aotd ? <CheckIcon /> : null}</Td>
      <Td>{favorite ? <CheckIcon /> : null}</Td>
      <Td>
        <Button
          marginRight={1}
          onClick={() => navigate('edit')}
          size='sm'
          variant='outline'
        >
          Edit
        </Button>
        <Button
          marginRight={1}
          onClick={() => navigate('delete')}
          size='sm'
          variant='outline'
        >
          Delete
        </Button>
      </Td>
    </Tr>
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
