import { ChangeEvent, FC, useState } from 'react';

import useNewReleases from '../../hooks/useNewReleases';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { graphQLClient } from '../../utils/fetcher';
import { CREATE_RELEASE } from '../../mutations';
import { MESSAGES } from '../../constants';
import CreateReleaseModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateReleaseContainer: FC<Props> = ({ isOpen, onClose }) => {
  const { mutate } = useNewReleases();
  const [release, setRelease] = useState({
    artist: '',
    title: '',
    date: '',
  });

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
    await graphQLClient.request(CREATE_RELEASE, release);
  };

  const options = {
    callbacks: [handleClose, mutate],
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <CreateReleaseModal
      header="Create"
      isOpen={isOpen}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
      release={release}
    />
  );
};

export default CreateReleaseContainer;
