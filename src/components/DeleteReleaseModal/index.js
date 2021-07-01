import { useMutation } from '@apollo/react-hooks';

import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_RELEASES } from '../../queries';
import { DELETE_RELEASE } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import DeleteDataModal from '../DeleteDataModal/presenter';

const DeleteReleaseContainer = () => {
  const [state, dispatch] = useApp();
  const { isOpen, data } = state.modal;
  const [deleteRelease] = useMutation(
    DELETE_RELEASE,
    {
      update (cache, { data: { deleteRelease } }) {
        const { releases } = cache.readQuery({ query: GET_RELEASES });
        cache.writeQuery({
          query: GET_RELEASES,
          data: { releases: releases.filter(item => item.id !== deleteRelease.id) },
        });
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
