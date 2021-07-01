import { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_FAVORITES } from '../../queries';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import TopAlbums from './presenter';

const TopAlbumsContainer: FC = () => {
  const {
    data,
    error,
    loading,
    networkStatus,
    refetch,
  } = useQuery(GET_FAVORITES, { notifyOnNetworkStatusChange: true });
  const isLoading = loading || networkStatus === 4;

  const refresh = () => {
    refetch();
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <TopAlbums
        data={data}
        error={error}
        isLoading={isLoading}
        refresh={refresh}
      />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
