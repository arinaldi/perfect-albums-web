import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { formatDate } from '../../utils';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_RELEASES } from '../../queries';
import { EDIT_RELEASE } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import EditReleaseModal from '../CreateReleaseModal/presenter';

const EditReleaseContainer = () => {
  const [state, dispatch] = useApp();
  const { data, isOpen } = state.modal;
  const [editRelease] = useMutation(
    EDIT_RELEASE,
    {
      update (cache, { data: { editRelease } }) {
        const { releases } = cache.readQuery({ query: GET_RELEASES });
        const releaseIndex = releases.findIndex(item => item.id === editRelease.id);
        cache.writeQuery({
          query: GET_RELEASES,
          data: {
            releases: [
              ...releases.slice(0, releaseIndex),
              editRelease,
              ...releases.slice(releaseIndex + 1),
            ],
          },
        });
      },
    },
  );
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

  const submitFunc = async () => {
    await editRelease({
      variables: { ...release, id: data.id },
    });
  };

  const options = {
    callback: handleClose,
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { handleSubmit, isSaving, isValidated } = useGqlSubmit(options);

  return (
    <EditReleaseModal
      isOpen={isOpen}
      header='Edit'
      release={release}
      isValidated={isValidated}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default EditReleaseContainer;
