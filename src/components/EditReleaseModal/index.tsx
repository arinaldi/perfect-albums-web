import { FC } from 'react';

import { MESSAGES } from '../../constants';
import useForm from '../../hooks/useForm';
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
  const { handleChange, resetForm, values } = useForm<ReleaseInput>({
    artist: release.artist,
    title: release.title,
    date: formatDate(release.date || ''),
  });

  function handleClose() {
    onClose();
    resetForm();
  }

  async function submitFn() {
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
    callbacks: [handleClose],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <EditReleaseModal
      header="Edit"
      isOpen={isOpen}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
      release={values}
    />
  );
};

export default EditReleaseContainer;
