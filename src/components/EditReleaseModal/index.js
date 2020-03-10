import React, { useEffect, useState } from 'react';

import Api from '../../utils/api';
import { formatDate } from '../../utils';
import useSubmit from '../../hooks/useSubmit';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import EditReleaseModal from '../CreateReleaseModal/presenter';

const EditReleaseContainer = () => {
  const [state, dispatch] = useApp();
  const { isOpen, data, callback } = state.modal;
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });

  useEffect(() => {
    setRelease({
      artist: data.artist,
      title: data.title,
      date: formatDate(data.date),
    });
  }, [data]);

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
    apiFunc: Api.put,
    callbacks: [handleClose, callback],
    data: release,
    path: `/api/releases/${data.id}`,
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { handleSubmit, isSaving, isValidated } = useSubmit(options);

  return (
    <EditReleaseModal
      isOpen={isOpen}
      header='Edit'
      release={release}
      isValidated={isValidated}
      isSaving={isSaving}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditReleaseContainer;
