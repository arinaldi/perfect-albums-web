import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { sortDesc } from '../../utils';
import { STATE_STATUSES } from '../../constants';
import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import AlbumCol from './AlbumCol';
import DecadeSelector from './DecadeSelector';
import TopLink from './TopLink';

const TopAlbums = (props) => {
  const {
    cancel,
    data,
    refresh,
    status,
  } = props;
  const { user: { isAuthenticated } } = useAppState();
  const isLoading = status === STATE_STATUSES.LOADING;

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <h3>Top Albums</h3>
          </Col>
          <Col xs='auto'>
            {isAuthenticated && (
              <Button
                variant='outline-dark'
                onClick={isLoading ? cancel : refresh}
                style={{ marginRight: '5px' }}
              >
                {isLoading ? 'Cancel' : 'Refresh'}
              </Button>
            )}
            <DecadeSelector />
          </Col>
        </Row>
        {status === STATE_STATUSES.FAILURE && <AppMessage />}
        {data && (
          <Row>
            {Object.keys(data).sort(sortDesc).map(year => (
              <AlbumCol
                key={year}
                data={data[year]}
                year={year}
                total={data[year].length}
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
  cancel: PropTypes.func.isRequired,
  data: PropTypes.object,
  refresh: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default TopAlbums;
