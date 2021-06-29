import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_SONGS } from '../../queries';
import { DELETE_SONG } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import DeleteDataModal from '../DeleteDataModal/presenter';

const DeleteSongContainer = () => {
  const [state, dispatch] = useApp();
  const { isOpen, data } = state.modal;
  const [deleteSong] = useMutation(
    DELETE_SONG,
    {
      update (cache, { data: { deleteSong } }) {
        const { songs } = cache.readQuery({ query: GET_SONGS });
        cache.writeQuery({
          query: GET_SONGS,
          data: { songs: songs.filter(song => song.id !== deleteSong.id) },
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
    await deleteSong({
      variables: { id: data.id },
    });
  };

  const options = {
    callback: handleClose,
    submitFunc,
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
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

export default DeleteSongContainer;
