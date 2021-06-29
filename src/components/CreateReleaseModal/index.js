import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_RELEASES } from '../../queries';
import { CREATE_RELEASE } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import CreateReleaseModal from './presenter';

const CreateReleaseContainer = () => {
  const [state, dispatch] = useApp();
  const { isOpen } = state.modal;
  const [createRelease] = useMutation(
    CREATE_RELEASE,
    {
      update (cache, { data: { createRelease } }) {
        const { releases } = cache.readQuery({ query: GET_RELEASES });
        cache.writeQuery({
          query: GET_RELEASES,
          data: { releases: [...releases, createRelease] },
        });
      },
    },
  );
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

  const submitFunc = async () => {
    await createRelease({
      variables: release,
    });
  };

  const options = {
    callback: handleClose,
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <CreateReleaseModal
      isOpen={isOpen}
      header='Create'
      release={release}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateReleaseContainer;
