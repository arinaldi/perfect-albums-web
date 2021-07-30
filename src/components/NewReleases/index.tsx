import { FC, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Release } from '../../utils/types';
import useNewReleases from '../../hooks/useNewReleases';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateReleaseModal from '../CreateReleaseModal';
import EditReleaseModal from '../EditReleaseModal';
import DeleteReleaseModal from '../DeleteReleaseModal';
import NewReleases from './presenter';

const NewReleasesContainer: FC = () => {
  const { data, hasError, isLoading } = useNewReleases();
  const [currentRelease, setCurrentRelease] = useState<Release>({
    artist: '',
    date: '',
    id: '',
    title: '',
  });
  const {
    isOpen: isCreateOpen,
    onClose: onCreateClose,
    onOpen: onCreateOpen,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onClose: onEditClose,
    onOpen: onEditOpen,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();

  function handleEditOpen(release: Release) {
    setCurrentRelease(release);
    onEditOpen();
  }

  function handleDeleteOpen(release: Release) {
    setCurrentRelease(release);
    onDeleteOpen();
  }

  const modal = {
    onCreateOpen,
    onDeleteOpen: handleDeleteOpen,
    onEditOpen: handleEditOpen,
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <NewReleases data={data} hasError={hasError} modal={modal} />
      <CreateReleaseModal isOpen={isCreateOpen} onClose={onCreateClose} />
      <EditReleaseModal
        data={currentRelease}
        isOpen={isEditOpen}
        onClose={onEditClose}
      />
      <DeleteReleaseModal
        data={currentRelease}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      />
    </ErrorBoundary>
  );
};

export default NewReleasesContainer;
