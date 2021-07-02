import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { formatDate } from '../../utils';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { EDIT_RELEASE } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import EditReleaseModal from '../CreateReleaseModal/presenter';

const EditReleaseContainer: FC = () => {
  const [state, dispatch] = useApp();
  const { data, isOpen } = state.modal;
  const [editRelease] = useMutation(EDIT_RELEASE);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;

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
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <EditReleaseModal
      isOpen={isOpen}
      header="Edit"
      release={release}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default EditReleaseContainer;
