import { FC, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Song } from '../../utils/types';
import useFeaturedSongs from '../../hooks/useFeaturedSongs';
import useTitle from '../../hooks/useTitle';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateSongModal from '../CreateSongModal';
import DeleteSongModal from '../DeleteSongModal';
import FeaturedSongs from './presenter';

const FeaturedSongsContainer: FC = () => {
  const { data, hasError, isLoading } = useFeaturedSongs();
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
};

export default FeaturedSongsContainer;
