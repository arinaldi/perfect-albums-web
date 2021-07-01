import { FC } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Release } from '../../utils/types';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_RELEASES } from '../../queries';
import { DELETE_RELEASE } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface CacheResponse {
  releases: Release[];
}

const DeleteReleaseContainer: FC = () => {
  const [state, dispatch] = useApp();
  const { isOpen, data } = state.modal;
  const [deleteRelease] = useMutation(
    DELETE_RELEASE,
    {
      update (cache, { data: { deleteRelease } }) {
        const response = cache.readQuery<CacheResponse>({ query: GET_RELEASES });

        if (response?.releases) {
          cache.writeQuery({
            query: GET_RELEASES,
            data: { releases: response.releases.filter((release: Release) => release.id !== deleteRelease.id) },
          });
        }
      },
    },
  );

  const handleClose = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
  };

  const submitFunc = async () => {
    await deleteRelease({
      variables: { id: data.id },
    });
  };

  const options = {
    callback: handleClose,
    submitFunc,
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <DeleteDataModal
      isOpen={isOpen}
      dataType={data.dataType}
      artist={data.artist}
      title={data.title}
      isDeleting={isSaving}
      onClose={handleClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteReleaseContainer;
