import React from 'react';
import {
  Box,
  Heading,
  IconButton,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { useAppState } from '../Provider';

const DateCol = (props) => {
  const {
    data,
    date,
    handleEditOpen,
    handleDeleteOpen,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Box>
      <Heading
        as='h5'
        mb={2}
        size='md'
      >
        {date}
      </Heading>
      <UnorderedList data-testid={`list-${date}`} pl={3}>
        {data.map(release => (
          <ListItem key={release.id}>
            <span>
              {release.artist} &ndash; {release.title}
            </span>
            {isAuthenticated && (
              <Box as='span' ml={1}>
                <IconButton
                  aria-label='Edit Release'
                  icon={<EditIcon />}
                  onClick={() => handleEditOpen(release)}
                  size='xs'
                  variant='ghost'
                />
                <IconButton
                  aria-label='Delete Release'
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteOpen(release)}
                  size='xs'
                  variant='ghost'
                />
              </Box>
            )}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

DateCol.propTypes = {
  data: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  handleEditOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default DateCol;
