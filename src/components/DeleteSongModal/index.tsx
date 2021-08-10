import { FC } from 'react';

import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useFeaturedSongs from '../../hooks/useFeaturedSongs';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { Song } from '../../utils/types';
import { DELETE_SONG } from '../../mutations';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Song;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteSongContainer: FC<Props> = ({ data: song, isOpen, onClose }) => {
  const { data, mutate } = useFeaturedSongs();

  async function submitFn() {
    if (data?.songs) {
      const songs = data.songs.filter((s) => s.id !== song.id);
      mutate({ songs }, false);
    }

    await graphQLClient.request(DELETE_SONG, { id: song.id });
  }

  const options = {
    callbacks: [onClose],
    mutate,
    submitFn,
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useSubmit(options);

  return (
    <DeleteDataModal
      data={song}
      dataType={MODAL_DATA_TYPES.SONG}
      isDeleting={isSaving}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteSongContainer;
