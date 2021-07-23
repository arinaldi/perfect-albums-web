import { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Td, Tr } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { Album } from '../../utils/types';

interface Props {
  item: Album;
}

const AdminTableRow: FC<Props> = ({ item }) => {
  const history = useHistory();
  const { search } = useLocation();
  const { id, artist, title, year, cd, aotd, favorite } = item;

  const navigate = (path: string) => {
    history.push(`/admin/${path}/${id}${search}`);
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
          size="sm"
          variant="outline"
        >
          Edit
        </Button>
        <Button
          marginRight={1}
          onClick={() => navigate('delete')}
          size="sm"
          variant="outline"
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default AdminTableRow;
