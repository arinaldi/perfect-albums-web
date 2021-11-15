import { MESSAGES, MODAL_DATA_TYPES } from '../../constants';
import useGqlMutation from '../../hooks/useGqlMutation';
import useSubmit from '../../hooks/useSubmit';
import { Song } from '../../utils/types';
import { DELETE_SONG } from '../../mutations';
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
  const deleteSong = useGqlMutation(DELETE_SONG);

  const options = {
    callbacks: [onClose],
    submitFn: async () => await deleteSong({ id: song.id }),
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
