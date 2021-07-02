import { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Release } from '../../utils/types';
import { DISPATCH_TYPES, MODAL_TYPES } from '../../constants';
import { GET_RELEASES } from '../../queries';
import { useAppDispatch } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import NewReleases from './presenter';

const NewReleasesContainer: FC = () => {
  const appDispatch = useAppDispatch();
  const {
    data,
    error,
    loading,
    networkStatus,
    refetch,
  } = useQuery(GET_RELEASES, { notifyOnNetworkStatusChange: true });
  const isLoading = loading || networkStatus === 4;

  const refresh = () => {
    refetch();
  };

  const handleCreateOpen = () => {
    appDispatch({
      payload: {
        type: MODAL_TYPES.NEW_RELEASE_CREATE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  const handleEditOpen = (release: Release) => {
    appDispatch({
      payload: {
        data: {
          ...release,
          dataType: 'Release',
        },
        type: MODAL_TYPES.NEW_RELEASE_EDIT,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  const handleDeleteOpen = (release: Release) => {
    appDispatch({
      payload: {
        data: {
          ...release,
          dataType: 'Release',
        },
        type: MODAL_TYPES.NEW_RELEASE_DELETE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <NewReleases
        data={data}
        error={error}
        isLoading={isLoading}
        onCreateOpen={handleCreateOpen}
        onEditOpen={handleEditOpen}
        onDeleteOpen={handleDeleteOpen}
        refresh={refresh}
      />
    </ErrorBoundary>
  );
};

export default NewReleasesContainer;