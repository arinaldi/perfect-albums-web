import { useForm } from 'react-hook-form';

import { MESSAGES } from '../../constants';
import useGqlMutation from '../../hooks/useGqlMutation';
import useSubmit from '../../hooks/useSubmit';
import { CREATE_RELEASE } from '../../mutations';
import { ReleaseInput } from '../../utils/types';
import CreateReleaseModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateReleaseContainer({ isOpen, onClose }: Props) {
  const createRelease = useGqlMutation(CREATE_RELEASE);
  const { handleSubmit, register, reset } = useForm<ReleaseInput>();

  function handleClose() {
    onClose();
    reset();
  }

  const options = {
    callbacks: [handleClose],
    handleSubmit,
    submitFn: async (release: ReleaseInput) => await createRelease(release),
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
