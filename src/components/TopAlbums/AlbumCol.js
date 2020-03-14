import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';

const AlbumCol = (props) => {
  const { data, year, total } = props;

  return (
    <Col xs={12} md={6} lg={4}>
      <Row>
        <Col>
          <h4>{year}</h4>
        </Col>
        <Col xs='auto'>
          <h4>
            <Badge variant='light'>
              {total}
            </Badge>
          </h4>
        </Col>
      </Row>
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
