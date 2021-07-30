import { ChangeEvent, FC, useEffect, useState } from 'react';

import useNewReleases from '../../hooks/useNewReleases';
import { formatDate } from '../../utils';
import { Release } from '../../utils/types';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { graphQLClient } from '../../utils/fetcher';
import { EDIT_RELEASE } from '../../mutations';
import { MESSAGES } from '../../constants';
import EditReleaseModal from '../CreateReleaseModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

const EditReleaseContainer: FC<Props> = ({ data, isOpen, onClose }) => {
  const { mutate } = useNewReleases();
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });

  useEffect(() => {
    setRelease({
      artist: data.artist,
      title: data.title,
      date: formatDate(data.date || ''),
    });
  }, [data]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;

    setRelease({
      ...release,
      [name]: value,
    });
  }

  function handleClose() {
    onClose();
    setRelease({
      artist: '',
      title: '',
      date: '',
    });
  }

  const submitFunc = async () => {
    await graphQLClient.request(EDIT_RELEASE, {
      ...release,
      id: data.id,
    });
  };

  const options = {
    callbacks: [handleClose, mutate],
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <EditReleaseModal
      header="Edit"
      isOpen={isOpen}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
      release={release}
    />
  );
};

export default EditReleaseContainer;
