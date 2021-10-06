import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { MESSAGES } from '../../constants';
import useQuery from '../../hooks/useQuery';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { EDIT_RELEASE } from '../../mutations';
import { GET_RELEASES } from '../../queries';
import { formatDate } from '../../utils';
import { Release, ReleaseInput, Releases } from '../../utils/types';
import EditReleaseModal from '../CreateReleaseModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

const EditReleaseContainer: FC<Props> = ({
  data: release,
  isOpen,
  onClose,
}) => {
  const { data, mutate } = useQuery<Releases>(GET_RELEASES);
  const { handleSubmit, register, setValue } = useForm<ReleaseInput>({});

  useEffect(() => {
    if (release) {
      setValue('artist', release.artist);
      setValue('title', release.title);
      setValue('date', formatDate(release.date || ''));
    }
  }, [release, setValue]);

  async function submitFn(values: ReleaseInput) {
    const updatedRelease = { ...values, id: release.id };

    if (data?.releases) {
      const releases = data.releases.map((r) =>
        r.id === release.id ? updatedRelease : r,
      );
      mutate({ releases }, false);
    }

    await graphQLClient.request(EDIT_RELEASE, updatedRelease);
  }

  const options = {
    callbacks: [onClose],
    handleSubmit,
    mutate,
    submitFn,
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
};

export default EditReleaseContainer;
