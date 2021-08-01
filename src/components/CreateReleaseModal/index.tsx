import { ChangeEvent, FC, useState } from 'react';

import useNewReleases from '../../hooks/useNewReleases';
import useSubmit from '../../hooks/useSubmit';
import { graphQLClient } from '../../utils/graphql';
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

  async function submitFn() {
    await graphQLClient.request(CREATE_RELEASE, release);
  }

  const options = {
    callbacks: [handleClose, mutate],
    submitFn,
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

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
