import React, { useState } from 'react';

import useSubmit from '../../hooks/useSubmit';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import CreateReleaseModal from './presenter';

const CreateReleaseContainer = () => {
  const [state, dispatch] = useApp();
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setRelease({
      ...release,
      [name]: value,
    });
  };

  const handleClose = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
    setRelease({
      artist: '',
      title: '',
      date: '',
    });
  };

  const options = {
    body: release,
    callbacks: [handleClose, state.modal.callback],
    method: 'POST',
    path: '/api/releases',
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { handleSubmit, isSaving, isValidated } = useSubmit(options);

  return (
    <CreateReleaseModal
      isOpen={state.modal.isOpen}
      header='Create'
      release={release}
      isValidated={isValidated}
      isSaving={isSaving}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateReleaseContainer;
