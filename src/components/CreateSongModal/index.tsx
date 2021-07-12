import { ChangeEvent, FC, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_SONGS } from '../../queries';
import { CREATE_SONG } from '../../mutations';
import { MESSAGES } from '../../constants';
import CreateSongModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSongContainer: FC<Props> = ({ isOpen, onClose }) => {
  const [createSong] = useMutation(CREATE_SONG, {
    refetchQueries: [{ query: GET_SONGS }],
    update(cache, { data: { createSong } }) {
      cache.modify({
        fields: {
          songs(existingSongs = []) {
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
    const {
      target: { name, value },
    } = event;

    setSong({
      ...song,
      [name]: value,
    });
  };

  const handleClose = () => {
    onClose();
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
      isOpen={isOpen}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
      song={song}
    />
  );
};

export default CreateSongContainer;
