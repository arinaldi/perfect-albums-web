import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { STATE_STATUSES } from '../../constants';
import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import CardWrapper from './CardWrapper';

const FeaturedSongs = (props) => {
  const {
    cancel,
    data,
    handleCreateOpen,
    handleDeleteOpen,
    refresh,
    status,
  } = props;
  const { user: { isAuthenticated } } = useAppState();
  const isLoading = status === STATE_STATUSES.LOADING;

  return (
    <Container>
      <Row>
        <Col>
          <h3>Featured Songs</h3>
        </Col>
        {isAuthenticated && (
          <Col xs='auto'>
            <Button
              variant='outline-dark'
              onClick={isLoading ? cancel : refresh}
              style={{ marginRight: '5px' }}
            >
              {isLoading ? 'Cancel' : 'Refresh'}
            </Button>
            <Button
              variant='outline-dark'
              onClick={handleCreateOpen}
            >
              New
            </Button>
          </Col>
        )}
      </Row>
      {status === STATE_STATUSES.FAILURE && <AppMessage />}
      {data && (
        <Row data-testid='card-row'>
          {data.map(song => (
            <CardWrapper
              key={song.id}
              song={song}
              handleDeleteOpen={handleDeleteOpen}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

FeaturedSongs.propTypes = {
  cancel: PropTypes.func.isRequired,
  data: PropTypes.array,
  handleCreateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default FeaturedSongs;
