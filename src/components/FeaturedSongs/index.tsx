import { FC } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';

import { Song } from '../../utils/types';
import { DISPATCH_TYPES, MODAL_TYPES } from '../../constants';
import { GET_SONGS } from '../../queries';
import { useAppDispatch } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import FeaturedSongs from './presenter';

const FeaturedSongsContainer: FC = () => {
  const appDispatch = useAppDispatch();
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

  const handleCreateOpen = () => {
    appDispatch({
      payload: {
        type: MODAL_TYPES.FEATURED_SONGS_CREATE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  const handleDeleteOpen = (song: Song) => {
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
        isLoading={isLoading}
        onCreateOpen={handleCreateOpen}
        onDeleteOpen={handleDeleteOpen}
        refresh={refresh}
      />
    </ErrorBoundary>
  );
};

export default FeaturedSongsContainer;
