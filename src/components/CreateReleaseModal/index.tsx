import { FC } from 'react';

import { MESSAGES } from '../../constants';
import useForm from '../../hooks/useForm';
import useQuery from '../../hooks/useQuery';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { CREATE_RELEASE } from '../../mutations';
import { GET_RELEASES } from '../../queries';
import { ReleaseInput, Releases } from '../../utils/types';
import CreateReleaseModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateReleaseContainer: FC<Props> = ({ isOpen, onClose }) => {
  const { data, mutate } = useQuery<Releases>(GET_RELEASES);
  const { handleChange, resetForm, values } = useForm<ReleaseInput>({
    artist: '',
    title: '',
    date: '',
  });

  function handleClose() {
    onClose();
    resetForm();
  }

  async function submitFn() {
    if (data?.releases) {
      const newRelease = { ...values, id: Date.now().toString() };
      mutate({ releases: [...data.releases, newRelease] }, false);
    }

    await graphQLClient.request(CREATE_RELEASE, values);
  }

  const options = {
    callbacks: [handleClose],
    mutate,
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
      release={values}
    />
  );
};

export default CreateReleaseContainer;
