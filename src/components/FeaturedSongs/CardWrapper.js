import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import { useAppState } from '../Provider';
import { ICONS } from '../../constants';

const CardWrapper = (props) => {
  const { song, handleDeleteOpen } = props;
  const { user: { isAuthenticated } } = useAppState();

  const handleClick = () => {
    handleDeleteOpen(song);
  };

  return (
    <Col
      xs={12}
      md={6}
      lg={3}
      style={{
        paddingTop: '7.5px',
        paddingBottom: '7.5px',
      }}
    >
      <Card>
        <Card.Body>
          <Card.Title>{song.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{song.artist}</Card.Subtitle>
          <Card.Link
            href={song.link}
            target='_blank'
            rel='noopener noreferrer'
          >
            Listen
          </Card.Link>
          {isAuthenticated && (
            <Card.Link
              style={{ color: '#007bff', cursor: 'pointer' }}
              onClick={handleClick}
            >
              {ICONS.X}
            </Card.Link>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

CardWrapper.propTypes = {
  song: PropTypes.object.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default CardWrapper;
