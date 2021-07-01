import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_SONGS } from '../../queries';
import { CREATE_SONG } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
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
  };

  const submitFunc = async () => {
    await createSong({
      variables: song,
    });
  };

  const options = {
    callback: handleClose,
    submitFunc,
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <CreateSongModal
      isOpen={state.modal.isOpen}
      song={song}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateSongContainer;
