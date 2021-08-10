import { FC } from 'react';

import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useNewReleases from '../../hooks/useNewReleases';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { Release } from '../../utils/types';
import { DELETE_RELEASE } from '../../mutations';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteReleaseContainer: FC<Props> = ({
  data: release,
  isOpen,
  onClose,
}) => {
  const { data, mutate } = useNewReleases();

  async function submitFn() {
    if (data?.releases) {
      const releases = data.releases.filter((r) => r.id !== release.id);
      mutate({ releases }, false);
    }

    await graphQLClient.request(DELETE_RELEASE, { id: release.id });
  }

  const options = {
    callbacks: [onClose],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <DeleteDataModal
      data={release}
      dataType={MODAL_DATA_TYPES.RELEASE}
      isDeleting={isSaving}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteReleaseContainer;
