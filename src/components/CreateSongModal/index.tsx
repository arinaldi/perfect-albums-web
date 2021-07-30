import { ChangeEvent, FC, useState } from 'react';

import useFeaturedSongs from '../../hooks/useFeaturedSongs';
import useSubmit from '../../hooks/useSubmit';
import { graphQLClient } from '../../utils/fetcher';
import { CREATE_SONG } from '../../mutations';
import { MESSAGES } from '../../constants';
import CreateSongModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSongContainer: FC<Props> = ({ isOpen, onClose }) => {
  const { mutate } = useFeaturedSongs();
  const [song, setSong] = useState({
    artist: '',
    title: '',
    link: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;

    setSong({
      ...song,
      [name]: value,
    });
  }

  function handleClose() {
    onClose();
    setSong({
      artist: '',
      title: '',
      link: '',
    });
  }

  async function submitFn() {
    await graphQLClient.request(CREATE_SONG, song);
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
      song={song}
    />
  );
};

export default CreateSongContainer;
