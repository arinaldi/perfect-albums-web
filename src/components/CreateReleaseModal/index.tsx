import { useForm } from 'react-hook-form';

import { MESSAGES } from '../../constants';
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

export default function CreateReleaseContainer({ isOpen, onClose }: Props) {
  const { data, mutate } = useQuery<Releases>(GET_RELEASES);
  const { handleSubmit, register, reset } = useForm<ReleaseInput>();

  function handleClose() {
    onClose();
    reset();
  }

  async function submitFn(release: ReleaseInput) {
    if (data?.releases) {
      const newRelease = { ...release, id: Date.now().toString() };
      mutate({ releases: [...data.releases, newRelease] }, false);
    }

    await graphQLClient.request(CREATE_RELEASE, release);
  }

  const options = {
    callbacks: [handleClose],
    handleSubmit,
    mutate,
    submitFn,
    successMessage: `${MESSAGES.RELEASE_PREFIX} created`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <CreateReleaseModal
      header="Create"
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={onSubmit}
      register={register}
    />
  );
}
