import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import useQuery from '../../hooks/useQuery';
import useTitle from '../../hooks/useTitle';
import { GET_SONGS } from '../../queries';
import { Song, Songs } from '../../utils/types';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateSongModal from '../CreateSongModal';
import DeleteSongModal from '../DeleteSongModal';
import FeaturedSongs from './presenter';

export default function FeaturedSongsContainer() {
  const { data, hasError, isLoading } = useQuery<Songs>(GET_SONGS);
  useTitle('Featured Songs');
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

  function handleDeleteOpen(song: Song) {
    setCurrentSong(song);
    onDeleteOpen();
  }

  const modal = {
    onCreateOpen,
    onDeleteOpen: handleDeleteOpen,
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <FeaturedSongs data={data} hasError={hasError} modal={modal} />
      <CreateSongModal isOpen={isCreateOpen} onClose={onCreateClose} />
      <DeleteSongModal
        data={currentSong}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </ErrorBoundary>
  );
}
