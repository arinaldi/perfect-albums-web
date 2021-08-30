import { FC } from 'react';

import { MESSAGES } from '../../constants';
import useForm from '../../hooks/useForm';
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
  const { handleChange, resetForm, values } = useForm<SongInput>({
    artist: '',
    title: '',
    link: '',
  });

  function handleClose() {
    onClose();
    resetForm();
  }

  async function submitFn() {
    if (data?.songs) {
      const newSong = { ...values, id: Date.now().toString() };
      mutate({ songs: [newSong, ...data.songs] }, false);
    }

    await graphQLClient.request(CREATE_SONG, values);
  }

  const options = {
    callbacks: [handleClose],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.SONG_PREFIX} created`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <CreateSongModal
      isOpen={isOpen}
      isSaving={isSaving}
      onChange={handleChange}
      onClose={handleClose}
      onSubmit={handleSubmit}
      song={values}
    />
  );
};

export default CreateSongContainer;
