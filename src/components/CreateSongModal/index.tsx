import { ChangeEvent, FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_SONGS } from '../../queries';
import { CREATE_SONG } from '../../mutations';
import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { useApp } from '../Provider';
import CreateSongModal from './presenter';

const CreateSongContainer: FC = () => {
  const [state, dispatch] = useApp();
  const [createSong] = useMutation(CREATE_SONG, {
    refetchQueries: [{ query: GET_SONGS }],
    update (cache, { data: { createSong } }) {
      cache.modify({
        fields: {
          songs (existingSongs = []) {
            const newSongRef = cache.writeFragment({
              data: createSong,
              fragment: gql`
                fragment NewSong on Song {
                  id
                  artist
                  title
                  link
                }
              `,
            });
            return [...existingSongs, newSongRef];
          },
        },
      });
    },
  });
  const [song, setSong] = useState({
    artist: '',
    title: '',
    link: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;

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
