import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import Page from './Page';
import LoadMore from './LoadMore';

const Sandbox = (props) => {
  const { handleNext, page } = props;
  const [dataPage, setDataPage] = useState(1);
  const data = [];

  for (let i = 0; i < dataPage; i++) {
    data.push(
      <Page
        key={i}
        direction='desc'
        page={i + 1}
        perPage={10}
        sort='year'
      />,
    );
  }

  return (
    <Container className='no-loader'>
      <Row>
        <Col>
          <h3 style={{ marginBottom: '10px' }}>Sandbox</h3>
          <Page page={page} perPage={10} />
          <div style={{ display: 'none' }}>
            <Page page={page + 1} perPage={10} />
          </div>
          <Button
            variant='outline-dark'
            onClick={handleNext}
          >
            Next
          </Button>
          <hr />
          {data}
          <Button
            variant='outline-dark'
            onClick={() => setDataPage(page => page + 1)}
          >
            Load More
          </Button>
        </Col>
        <Col>
          <h3 style={{ marginBottom: '10px' }}>Sandbox 2</h3>
          <LoadMore />
        </Col>
      </Row>
    </Container>
  );
};

Sandbox.propTypes = {
  handleNext: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Sandbox;
