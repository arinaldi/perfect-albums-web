import { FC } from 'react';
import { gql, useMutation } from '@apollo/client';

import { DISPATCH_TYPES, MESSAGES } from '../../constants';
import { Song } from '../..//utils/types';
import useGqlSubmit from '../../hooks/useGqlSubmit';
import { GET_SONGS } from '../../queries';
import { DELETE_SONG } from '../../mutations';
import { useApp } from '../Provider';
import DeleteDataModal from '../DeleteDataModal/presenter';

const DeleteSongContainer: FC = () => {
  const [state, dispatch] = useApp();
  const { isOpen, data } = state.modal;
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: GET_SONGS }],
    update (cache, { data: { deleteSong } }) {
      cache.modify({
        fields: {
          songs (existingSongs = []) {
            cache.writeFragment({
              data: deleteSong,
              fragment: gql`
                fragment DeleteSong on Song {
                  id
                }
              `,
            });
            return existingSongs.filter((song: Song) => song.id !== deleteSong.id);
          },
        },
      });
    },
  });

  const handleClose = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_MODAL,
    });
  };

  const submitFunc = async () => {
    await deleteSong({
      variables: { id: data.id },
    });
  };

  const options = {
    callback: handleClose,
    submitFunc,
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  };
  const { handleSubmit, isSaving } = useGqlSubmit(options);

  return (
    <DeleteDataModal
      isOpen={isOpen}
      dataType={data.dataType}
      artist={data.artist}
      title={data.title}
      isDeleting={isSaving}
      onClose={handleClose}
      onDelete={handleSubmit}
    />
  );
};

export default DeleteSongContainer;
