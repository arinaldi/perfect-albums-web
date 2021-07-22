import { FC } from 'react';
import {
  Box,
  Heading,
  IconButton,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { Release } from '../../utils/types';
import useStore from '../../hooks/useStore';

interface Props {
  data: Release[];
  date: string;
  onEditOpen: (release: Release) => void;
  onDeleteOpen: (release: Release) => void;
}

const DateCol: FC<Props> = (props) => {
  const { data, date, onEditOpen, onDeleteOpen } = props;
  const hasAuth = useStore((state) => state.hasAuth);

  return (
    <Box>
      <Heading as="h5" marginBottom={2} size="md">
        {date}
      </Heading>
      <UnorderedList data-testid={`list-${date}`} pl={3}>
        {data.map((release) => (
          <ListItem key={release.id}>
            <span>
              {release.artist} &ndash; {release.title}
            </span>
            {hasAuth ? (
              <Box as="span" ml={1}>
                <IconButton
                  aria-label="Edit Release"
                  icon={<EditIcon />}
                  onClick={() => onEditOpen(release)}
                  size="xs"
                  variant="ghost"
                />
                <IconButton
                  aria-label="Delete Release"
                  icon={<DeleteIcon />}
                  onClick={() => onDeleteOpen(release)}
                  size="xs"
                  variant="ghost"
                />
              </Box>
            ) : null}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default DateCol;
