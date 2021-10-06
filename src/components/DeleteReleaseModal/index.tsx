import { FC } from 'react';

import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useQuery from '../../hooks/useQuery';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { DELETE_RELEASE } from '../../mutations';
import { GET_RELEASES } from '../../queries';
import { Release, Releases } from '../../utils/types';
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
  const { data, mutate } = useQuery<Releases>(GET_RELEASES);

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
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <DeleteDataModal
      data={release}
      dataType={MODAL_DATA_TYPES.RELEASE}
      isDeleting={isSubmitting}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={onSubmit}
    />
  );
};

export default DeleteReleaseContainer;
