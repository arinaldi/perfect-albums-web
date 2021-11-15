import { useForm } from 'react-hook-form';

import { MESSAGES } from '../../constants';
import useGqlMutation from '../../hooks/useGqlMutation';
import useSubmit from '../../hooks/useSubmit';
import { CREATE_SONG } from '../../mutations';
import { SongInput } from '../../utils/types';
import CreateSongModal from './presenter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateSongContainer({ isOpen, onClose }: Props) {
  const createSong = useGqlMutation(CREATE_SONG);
  const { handleSubmit, register, reset } = useForm<SongInput>();

  function handleClose() {
    onClose();
    reset();
  }

  const options = {
    callbacks: [handleClose],
    handleSubmit,
    submitFn: async (song: SongInput) => await createSong(song),
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
}
