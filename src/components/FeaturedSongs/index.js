import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { DISPATCH_TYPES, MODAL_TYPES } from '../../constants';
import { GET_SONGS } from '../../queries';
import { useAppDispatch } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import FeaturedSongs from './presenter';

const FeaturedSongsContainer = () => {
  const appDispatch = useAppDispatch();
  const {
    data,
    error,
    loading,
    networkStatus,
    refetch,
  } = useQuery(GET_SONGS, { notifyOnNetworkStatusChange: true });
  const isLoading = loading || networkStatus === 4;

  const refresh = () => {
    refetch();
  };

  const handleCreateOpen = () => {
    appDispatch({
      payload: {
        type: MODAL_TYPES.FEATURED_SONGS_CREATE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  const handleDeleteOpen = (song) => {
    appDispatch({
      payload: {
        data: {
          ...song,
          dataType: 'Song',
        },
        type: MODAL_TYPES.FEATURED_SONGS_DELETE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <FeaturedSongs
        data={data}
        error={error}
        handleCreateOpen={handleCreateOpen}
        handleDeleteOpen={handleDeleteOpen}
        isLoading={isLoading}
        refresh={refresh}
      />
    </ErrorBoundary>
  );
};

export default FeaturedSongsContainer;
