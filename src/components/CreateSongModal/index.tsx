import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { MESSAGES } from '../../constants';
import useQuery from '../../hooks/useQuery';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { CREATE_SONG } from '../../mutations';
import { GET_SONGS } from '../../queries';
import { SongInput, Songs } from '../../utils/types';
import CreateSongModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSongContainer: FC<Props> = ({ isOpen, onClose }) => {
  const { data, mutate } = useQuery<Songs>(GET_SONGS);
  const { handleSubmit, register, reset } = useForm<SongInput>();

  function handleClose() {
    onClose();
    reset();
  }

  async function submitFn(song: SongInput) {
    if (data?.songs) {
      const newSong = { ...song, id: Date.now().toString() };
      mutate({ songs: [newSong, ...data.songs] }, false);
    }

    await graphQLClient.request(CREATE_SONG, song);
  }

  const options = {
    callbacks: [handleClose],
    handleSubmit,
    mutate,
    submitFn,
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <CreateSongModal
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={handleClose}
      onSubmit={onSubmit}
      register={register}
    />
  );
};

export default CreateSongContainer;
