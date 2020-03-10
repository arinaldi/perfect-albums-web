import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import SubmitButton from '../SubmitButton/presenter';

const DeleteDataModal = (props) => {
  const {
    artist,
    dataType,
    handleClose,
    handleDelete,
    isDeleting,
    isOpen,
    title,
  } = props;

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {dataType}</Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleDelete}>
        <Modal.Body>
          <p>{`Are you sure you want to delete ${artist} – ${title}?`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-dark'
            onClick={handleClose}
          >
            Close
          </Button>
          <SubmitButton
            isDisabled={isDeleting}
            isLoading={isDeleting}
            text='Delete'
            loadingText='Deleting...'
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

DeleteDataModal.propTypes = {
  artist: PropTypes.string.isRequired,
  dataType: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteDataModal;
