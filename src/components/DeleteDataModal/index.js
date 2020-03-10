import React from 'react';

import { DISPATCH_TYPES } from '../../constants';
import Api from '../../utils/api';
import useSubmit from '../../hooks/useSubmit';
import { useApp } from '../Provider';
import DeleteDataModal from './presenter';

const DeleteDataContainer = () => {
  const [state, dispatch] = useApp();
  const { isOpen, data, callback } = state.modal;

  const closeModal = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
  };

  const options = {
    apiFunc: Api.delete,
    callbacks: [closeModal, callback],
    data: null,
    path: `/api/${data.path}/${data.id}`,
    successMessage: `${data.dataType} successfully deleted`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <DeleteDataModal
      isOpen={isOpen}
      dataType={data.dataType}
      artist={data.artist}
      title={data.title}
      isDeleting={isSaving}
      handleClose={closeModal}
      handleDelete={handleSubmit}
    />
  );
};

export default DeleteDataContainer;
