import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import CardWrapper from './CardWrapper';

const FeaturedSongs = (props) => {
  const {
    data,
    error,
    handleCreateOpen,
    handleDeleteOpen,
    isLoading,
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Container>
      <Row style={{ marginBottom: '10px' }}>
        <Col>
          <h3>Featured Songs</h3>
        </Col>
        {isAuthenticated && (
          <Col xs='auto'>
            <Button
              variant='outline-dark'
              disabled={isLoading}
              onClick={refresh}
              style={{ marginRight: '5px' }}
            >
              Refresh
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
      {error && <AppMessage />}
      {data && data.songs && (
        <Row data-testid='card-row'>
          {data.songs.map(song => (
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
  data: PropTypes.object,
  error: PropTypes.object,
  handleCreateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
};

export default FeaturedSongs;
