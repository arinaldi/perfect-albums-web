import { FC } from 'react';
import { gql, useMutation } from '@apollo/client';

import { MESSAGES } from '../../constants';
import { ModalDataType, Song } from '../..//utils/types';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_SONGS } from '../../queries';
import { DELETE_SONG } from '../../mutations';
import DeleteDataModal from '../DeleteDataModal/presenter';

interface Props {
  data: Song;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteSongContainer: FC<Props> = ({ data, isOpen, onClose }) => {
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: GET_SONGS }],
    update(cache, { data: { deleteSong } }) {
      cache.modify({
        fields: {
          songs(existingSongs = []) {
            cache.writeFragment({
              data: deleteSong,
              fragment: gql`
                fragment DeleteSong on Song {
                  id
                }
              `,
            });
            return existingSongs.filter(
              (song: Song) => song.id !== deleteSong.id,
            );
          },
        },
      });
    },
  });

  const submitFunc = async () => {
    await deleteSong({
      variables: { id: data.id },
    });
  };

  const options = {
    callback: onClose,
    submitFunc,
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <DeleteDataModal
      data={data}
      dataType={ModalDataType.song}
      isDeleting={isSaving}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteSongContainer;
