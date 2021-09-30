import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Td, Tr } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { Album } from '../../utils/types';

interface Props {
  item: Album;
}

const AdminTableRow: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id, artist, title, year, cd, aotd, favorite, studio } = item;

  function handleNavigate(path: string) {
    navigate(`/admin/${path}/${id}${search}`);
  }

  return (
    <Tr data-testid={id}>
      <Td>{artist}</Td>
      <Td>
        {studio ? (
          <Box as="span" marginRight={2}>
            💿
          </Box>
        ) : null}
        {title}
      </Td>
      <Td>{year}</Td>
      <Td>{cd ? <CheckIcon /> : null}</Td>
      <Td>{aotd ? <CheckIcon /> : null}</Td>
      <Td>{favorite ? <CheckIcon /> : null}</Td>
      <Td>
        <Button
          marginRight={1}
          onClick={() => handleNavigate('edit')}
          size="sm"
          variant="outline"
        >
          Edit
        </Button>
        <Button
          marginRight={1}
          onClick={() => handleNavigate('delete')}
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
