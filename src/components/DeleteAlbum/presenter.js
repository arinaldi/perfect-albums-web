import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import SubmitButton from '../SubmitButton/presenter';

const DeleteAlbum = (props) => {
  const {
    data,
    handleSubmit,
    isDeleting,
    query,
    status,
  } = props;
  const history = useHistory();

  return (
    <Container>
      <h3>Delete Album</h3>
      {status === STATE_STATUSES.FAILURE && <AppMessage />}
      {data && (
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='formConfirm'>
              {`Are you sure you want to delete ${data.artist} – ${data.title}?`}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button
              onClick={() => history.push(`/admin?${query}`)}
              variant='outline-dark'
              style={{ marginRight: 5 }}
            >
              Cancel
            </Button>
            <SubmitButton
              isDisabled={isDeleting}
              isLoading={isDeleting}
              text='Delete'
              loadingText='Deleting...'
            />
          </Form.Row>
        </Form>
      )}
    </Container>
  );
};

DeleteAlbum.propTypes = {
  data: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
  query: PropTypes.string,
  status: PropTypes.string.isRequired,
};

DeleteAlbum.defaultProps = {
  isDeleting: false,
  query: '',
};

export default DeleteAlbum;
