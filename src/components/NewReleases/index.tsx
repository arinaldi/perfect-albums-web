import { FC, useState } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';

import { Release } from '../../utils/types';
import { GET_RELEASES } from '../../queries';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import CreateReleaseModal from '../CreateReleaseModal';
import EditReleaseModal from '../EditReleaseModal';
import DeleteReleaseModal from '../DeleteReleaseModal';
import NewReleases from './presenter';

const NewReleasesContainer: FC = () => {
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
  const { data, error, loading, networkStatus, refetch } = useQuery(
    GET_RELEASES,
    { notifyOnNetworkStatusChange: true },
  );
  const isLoading = loading || networkStatus === NetworkStatus.refetch;

  const refresh = () => {
    refetch();
  };

  const handleEditOpen = (release: Release) => {
    setCurrentRelease(release);
    onEditOpen();
  };

  const handleDeleteOpen = (release: Release) => {
    setCurrentRelease(release);
    onDeleteOpen();
  };

  const modal = {
    onCreateOpen,
    onDeleteOpen: handleDeleteOpen,
    onEditOpen: handleEditOpen,
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <NewReleases
        data={data}
        error={error}
        isLoading={isLoading}
        modal={modal}
        refresh={refresh}
      />
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
