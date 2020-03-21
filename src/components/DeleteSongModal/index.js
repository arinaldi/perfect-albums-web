import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { GET_SONGS } from '../../queries';
import { DELETE_SONG } from '../../mutations';
import {
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from '../../constants';
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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDeleting(true);

    try {
      await deleteSong({
        variables: { id: data.id },
      });

      handleClose();
      dispatch({
        payload: {
          message: `${MESSAGES.SONG_PREFIX} deleted`,
          type: TOAST_TYPES.SUCCESS,
        },
        type: DISPATCH_TYPES.OPEN_TOAST,
      });
    } catch (err) {
      setIsDeleting(false);
      dispatch({
        payload: {
          message: err.message || MESSAGES.ERROR,
          type: TOAST_TYPES.ERROR,
        },
        type: DISPATCH_TYPES.OPEN_TOAST,
      });
    }
  };

  return (
    <DeleteDataModal
      isOpen={isOpen}
      dataType={data.dataType}
      artist={data.artist}
      title={data.title}
      isDeleting={isDeleting}
      handleClose={handleClose}
      handleDelete={handleSubmit}
    />
  );
};

export default DeleteSongContainer;
