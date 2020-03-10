import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import InputFeedback from '../InputFeedback/presenter';
import SubmitButton from '../SubmitButton/presenter';

const CreateSongModal = (props) => {
  const {
    handleChange,
    handleClose,
    handleSubmit,
    isOpen,
    isSaving,
    isValidated,
    song,
  } = props;

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Song</Modal.Title>
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
            value={song.artist}
            onChange={handleChange}
          />
          <InputFeedback
            controlId='formTitle'
            label='Title'
            name='title'
            value={song.title}
            onChange={handleChange}
          />
          <InputFeedback
            controlId='formLink'
            label='Link'
            name='link'
            value={song.link}
            onChange={handleChange}
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

CreateSongModal.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool,
  isValidated: PropTypes.bool,
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
};

export default CreateSongModal;
