import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { MESSAGES } from '../../constants';
import useGqlMutation from '../../hooks/useGqlMutation';
import useSubmit from '../../hooks/useSubmit';
import { EDIT_RELEASE } from '../../mutations';
import { formatDate } from '../../utils';
import { Release, ReleaseInput } from '../../utils/types';
import EditReleaseModal from '../CreateReleaseModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditReleaseContainer({
  data: release,
  isOpen,
  onClose,
}: Props) {
  const editRelease = useGqlMutation(EDIT_RELEASE);
  const { handleSubmit, register, setValue } = useForm<ReleaseInput>({});

  useEffect(() => {
    if (release) {
      setValue('artist', release.artist);
      setValue('title', release.title);
      setValue('date', formatDate(release.date || ''));
    }
  }, [release, setValue]);

  const options = {
    callbacks: [onClose],
    handleSubmit,
    submitFn: async (values: ReleaseInput) =>
      await editRelease({ ...values, id: release.id }),
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <EditReleaseModal
      header="Edit"
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      register={register}
    />
  );
}
