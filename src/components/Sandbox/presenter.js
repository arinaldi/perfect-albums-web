import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import Page from './Page';

const Sandbox = (props) => {
  const { handleNext, page } = props;

  return (
    <Container className='no-loader'>
      <Row style={{ marginBottom: '10px' }}>
        <Col>
          <h3>Sandbox</h3>
        </Col>
        <Col xs='auto'>
          <Button
            variant='outline-dark'
            onClick={handleNext}
          >
            Next
          </Button>
        </Col>
      </Row>
      <Page page={page} />
      <div style={{ display: 'none' }}>
        <Page page={page + 1} />
      </div>
    </Container>
  );
};

Sandbox.propTypes = {
  handleNext: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Sandbox;
