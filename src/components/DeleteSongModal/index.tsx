import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useQuery from '../../hooks/useQuery';
import { graphQLClient } from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import { Song, Songs } from '../../utils/types';
import { DELETE_SONG } from '../../mutations';
import { GET_SONGS } from '../../queries';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Song;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteSongContainer({
  data: song,
  isOpen,
  onClose,
}: Props) {
  const { data, mutate } = useQuery<Songs>(GET_SONGS);

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
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <DeleteDataModal
      data={song}
      dataType={MODAL_DATA_TYPES.SONG}
      isDeleting={isSubmitting}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={onSubmit}
    />
  );
}
