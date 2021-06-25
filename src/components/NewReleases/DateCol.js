import React from 'react';
import {
  Box,
  Heading,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { ICONS } from '../../constants';
import { useAppState } from '../Provider';

const style = {
  cursor: 'pointer',
  verticalAlign: 'middle',
};

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
              <>
                <span style={style} onClick={() => handleEditOpen(release)}>
                  &nbsp;&nbsp;{ICONS.PENCIL}
                </span>
                <span style={style} onClick={() => handleDeleteOpen(release)}>
                  {ICONS.X}
                </span>
              </>
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
