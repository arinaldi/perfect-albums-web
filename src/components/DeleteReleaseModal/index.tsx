import { FC } from 'react';

import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import useNewReleases from '../../hooks/useNewReleases';
import { graphQLClient } from '../../utils/fetcher';
import { Release } from '../../utils/types';
import { DELETE_RELEASE } from '../../mutations';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Release;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteReleaseContainer: FC<Props> = ({ data, isOpen, onClose }) => {
  const { mutate } = useNewReleases();

  async function submitFunc() {
    await graphQLClient.request(DELETE_RELEASE, { id: data.id });
  }

  const options = {
    callbacks: [onClose, mutate],
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <DeleteDataModal
      data={data}
      dataType={MODAL_DATA_TYPES.RELEASE}
      isDeleting={isSaving}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteReleaseContainer;
