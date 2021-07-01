import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Td,
  Tr,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { Album } from '../../utils/types';

interface Props {
  item: Album;
  searchText: string;
}

const AdminTableRow: FC<Props> = ({ item, searchText = '' }) => {
  const history = useHistory();
  const { id, artist, title, year, cd, aotd, favorite } = item;

  const navigate = (path: string) => {
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
