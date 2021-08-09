import { FC } from 'react';

import { MESSAGES } from '../../constants';
import useFeaturedSongs from '../../hooks/useFeaturedSongs';
import useForm from '../../hooks/useForm';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { CREATE_SONG } from '../../mutations';
import { SongInput } from '../../utils/types';
import CreateSongModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSongContainer: FC<Props> = ({ isOpen, onClose }) => {
  const { mutate } = useFeaturedSongs();
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
    await graphQLClient.request(CREATE_SONG, values);
  }

  const options = {
    callbacks: [handleClose, mutate],
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
