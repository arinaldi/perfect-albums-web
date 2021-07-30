import { FC } from 'react';

import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import useFeaturedSongs from '../../hooks/useFeaturedSongs';
import { graphQLClient } from '../../utils/fetcher';
import { Song } from '../../utils/types';
import { DELETE_SONG } from '../../mutations';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Song;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteSongContainer: FC<Props> = ({ data, isOpen, onClose }) => {
  const { mutate } = useFeaturedSongs();

  async function submitFunc() {
    await graphQLClient.request(DELETE_SONG, { id: data.id });
  }

  const options = {
    callbacks: [onClose, mutate],
    submitFunc,
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <DeleteDataModal
      data={data}
      dataType={MODAL_DATA_TYPES.SONG}
      isDeleting={isSaving}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteSongContainer;
