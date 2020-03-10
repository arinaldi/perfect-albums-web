import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import InputFeedback from '../InputFeedback/presenter';
import SubmitButton from '../SubmitButton/presenter';

const CreateReleaseModal = (props) => {
  const {
    isOpen,
    header,
    release,
    isValidated,
    isSaving,
    handleChange,
    handleClose,
    handleSubmit,
  } = props;

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header} Release</Modal.Title>
      </Modal.Header>
      <Form
        noValidate
        validated={isValidated}
        onSubmit={handleSubmit}
      >
        <Modal.Body>
          <InputFeedback
            controlId='formArtist'
            label='Artist'
            name='artist'
            value={release.artist}
            onChange={handleChange}
          />
          <InputFeedback
            controlId='formTitle'
            label='Title'
            name='title'
            value={release.title}
            onChange={handleChange}
          />
          <InputFeedback
            controlId='formDate'
            label='Date'
            name='date'
            value={release.date}
            onChange={handleChange}
            type='date'
            isRequired={false}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-dark'
            onClick={handleClose}
          >
            Close
          </Button>
          <SubmitButton
            isDisabled={isSaving}
            isLoading={isSaving}
            text='Save'
            loadingText='Saving...'
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

CreateReleaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  release: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
  }),
  isValidated: PropTypes.bool,
  isSaving: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CreateReleaseModal;
