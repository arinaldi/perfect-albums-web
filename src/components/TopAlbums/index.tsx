import { FC } from 'react';

import useQuery from '../../hooks/useQuery';
import useTitle from '../../hooks/useTitle';
import { GET_FAVORITES } from '../../queries';
import { Favorites } from '../../utils/types';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import TopAlbums from './presenter';

const TopAlbumsContainer: FC = () => {
  const { data, hasError, isLoading } = useQuery<Favorites>(GET_FAVORITES);
  useTitle('Top Albums');

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <TopAlbums data={data} hasError={hasError} />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
