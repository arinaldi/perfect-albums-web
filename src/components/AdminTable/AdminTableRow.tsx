import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Td, Tr } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { Album } from '../../utils/types';

interface Props {
  item: Album;
}

export default function AdminTableRow({ item }: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id, artist, title, year, cd, aotd, favorite, studio } = item;

  return (
    <Tr data-testid={id}>
      <Td>{artist}</Td>
      <Td>
        {studio ? <Box as="span">*</Box> : null}
        {title}
      </Td>
      <Td>{year}</Td>
      <Td>{cd ? <CheckIcon /> : null}</Td>
      <Td>{aotd ? <CheckIcon /> : null}</Td>
      <Td>{favorite ? <CheckIcon /> : null}</Td>
      <Td>
        <Button
          marginRight={1}
          onClick={() => navigate(`/admin/edit/${id}${search}`)}
          size="sm"
          variant="outline"
        >
          Edit
        </Button>
        <Button
          marginRight={1}
          onClick={() => navigate(`/admin/delete/${id}${search}`)}
          size="sm"
          variant="outline"
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
}
