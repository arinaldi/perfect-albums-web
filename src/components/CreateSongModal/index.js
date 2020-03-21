import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { GET_SONGS } from '../../queries';
import { CREATE_SONG } from '../../mutations';
import {
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from '../../constants';
import { useApp } from '../Provider';
import CreateSongModal from './presenter';

const CreateSongContainer = () => {
  const [state, dispatch] = useApp();
  const [createSong] = useMutation(
    CREATE_SONG,
    {
      update (cache, { data: { createSong } }) {
        const { songs } = cache.readQuery({ query: GET_SONGS });
        cache.writeQuery({
          query: GET_SONGS,
          data: { songs: [createSong].concat(songs) },
        });
      },
    },
  );
  const [song, setSong] = useState({
    artist: '',
    title: '',
    link: '',
  });
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setSong({
      ...song,
      [name]: value,
    });
  };

  const handleClose = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
    setSong({
      artist: '',
      title: '',
      link: '',
    });
    setIsValidated(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        await createSong({
          variables: { ...song },
        });
        setIsSaving(false);

        handleClose();
        dispatch({
          payload: {
            message: `${MESSAGES.SONG_PREFIX} created`,
            type: TOAST_TYPES.SUCCESS,
          },
          type: DISPATCH_TYPES.OPEN_TOAST,
        });
      } catch (err) {
        setIsSaving(false);
        dispatch({
          payload: {
            message: err.message || MESSAGES.ERROR,
            type: TOAST_TYPES.ERROR,
          },
          type: DISPATCH_TYPES.OPEN_TOAST,
        });
      }
    } else {
      setIsValidated(true);
    }
  };

  return (
    <CreateSongModal
      isOpen={state.modal.isOpen}
      song={song}
      isValidated={isValidated}
      isSaving={isSaving}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateSongContainer;
