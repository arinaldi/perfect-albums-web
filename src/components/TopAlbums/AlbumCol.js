import React from 'react';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PropTypes from 'prop-types';

const AlbumCol = (props) => {
  const { data, year, total } = props;

  return (
    <Col xs={12} md={6} lg={4}>
      <OverlayTrigger
        placement='right'
        overlay={
          <Tooltip>
            <h5 style={{ marginBottom: 0 }}>
              {total}
            </h5>
          </Tooltip>
        }
      >
        <h4
          id={year}
          style={{
            cursor: 'zoom-in',
            display: 'inline-block',
            paddingRight: '8px',
          }}
        >
          {year}
        </h4>
      </OverlayTrigger>
      <ul data-testid={`list-${year}`}>
        {data.map((album, index) => (
          <li key={index}>
            {album.artist} &ndash; {album.title}
          </li>
        ))}
      </ul>
    </Col>
  );
};

AlbumCol.propTypes = {
  data: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default AlbumCol;
