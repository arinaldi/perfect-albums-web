import { FC, useState } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';

import { Song } from '../../utils/types';
import { GET_SONGS } from '../../queries';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateSongModal from '../CreateSongModal';
import DeleteSongModal from '../DeleteSongModal';
import FeaturedSongs from './presenter';

const FeaturedSongsContainer: FC = () => {
  const [currentSong, setCurrentSong] = useState<Song>({
    artist: '',
    id: '',
    link: '',
    title: '',
  });
  const {
    isOpen: isCreateOpen,
    onClose: onCreateClose,
    onOpen: onCreateOpen,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();
  const {
    data,
    error,
    loading,
    networkStatus,
    refetch,
  } = useQuery(GET_SONGS, { notifyOnNetworkStatusChange: true });
  const isLoading = loading || networkStatus === NetworkStatus.refetch;

  const refresh = () => {
    refetch();
  };

  const handleDeleteOpen = (song: Song) => {
    setCurrentSong(song);
    onDeleteOpen();
  };

  const modal = {
    onCreateOpen,
    onDeleteOpen: handleDeleteOpen,
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <FeaturedSongs
        data={data}
        error={error}
        isLoading={isLoading}
        modal={modal}
        refresh={refresh}
      />
      <CreateSongModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
      />
      <DeleteSongModal
        data={currentSong}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </ErrorBoundary>
  );
};

export default FeaturedSongsContainer;
