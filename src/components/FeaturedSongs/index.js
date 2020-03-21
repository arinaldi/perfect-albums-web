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
  const { data, error, loading } = useQuery(GET_SONGS);

  const cancel = () => {
    // GQL fn?
  };

  const refresh = () => {
    // GQL fn?
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
          path: 'songs',
        },
        type: MODAL_TYPES.FEATURED_SONGS_DELETE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={loading} />
      <FeaturedSongs
        cancel={cancel}
        data={data}
        error={error}
        handleCreateOpen={handleCreateOpen}
        handleDeleteOpen={handleDeleteOpen}
        refresh={refresh}
      />
    </ErrorBoundary>
  );
};

export default FeaturedSongsContainer;
