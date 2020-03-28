import React, { Fragment } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { formatFavorites, sortDesc } from '../../utils';
import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import AlbumCol from './AlbumCol';
import DecadeSelector from './DecadeSelector';
import TopLink from './TopLink';

const TopAlbums = (props) => {
  const {
    data,
    error,
    isLoading,
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Fragment>
      <Container>
        <Row style={{ marginBottom: '10px' }}>
          <Col>
            <h3>Top Albums
              {data && data.favorites && (
                <Badge variant='light' style={{ marginLeft: '5px' }}>
                  {data.favorites.length.toLocaleString()}
                </Badge>
              )}
            </h3>
          </Col>
          <Col xs='auto'>
            {isAuthenticated && (
              <Button
                variant='outline-dark'
                disabled={isLoading}
                onClick={refresh}
                style={{ marginRight: '5px' }}
              >
                Refresh
              </Button>
            )}
            <DecadeSelector />
          </Col>
        </Row>
        {error && <AppMessage />}
        {data && data.favorites && (
          <Row>
            {Object
              .entries(formatFavorites(data.favorites))
              .sort(sortDesc)
              .map(([year, favorites]) => (
                <AlbumCol
                  key={year}
                  data={favorites}
                  year={year}
                  total={favorites.length}
                />
              ))}
          </Row>
        )}
      </Container>
      <TopLink />
    </Fragment>
  );
};

TopAlbums.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
};

export default TopAlbums;
