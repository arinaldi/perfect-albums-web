import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import SubmitButton from '../SubmitButton/presenter';

const DeleteAlbum = (props) => {
  const {
    data,
    isDeleting,
    onSubmit,
    query,
    status,
  } = props;
  const history = useHistory();

  const handleCancel = () => {
    history.push(`/admin?${query}`);
  };

  return (
    <Container maxWidth='container.lg' mb={3}>
      <Heading as='h3' size='lg'>Delete Album</Heading>
      {status === STATE_STATUSES.FAILURE && <AppMessage />}
      {data && (
        <form onSubmit={onSubmit}>
          <Text marginY={4}>
            {`Are you sure you want to delete ${data.artist} – ${data.title}?`}
          </Text>
          <Box>
            <Button
              onClick={handleCancel}
              marginRight={2}
              variant='outline'
            >
              Cancel
            </Button>
            <SubmitButton
              isDisabled={isDeleting}
              isLoading={isDeleting}
              loadingText='Deleting'
              text='Delete'
            />
          </Box>
        </form>
      )}
    </Container>
  );
};

DeleteAlbum.propTypes = {
  data: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  isDeleting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string,
  status: PropTypes.string.isRequired,
};

DeleteAlbum.defaultProps = {
  isDeleting: false,
  query: '',
};

export default DeleteAlbum;
