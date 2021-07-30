import { FC } from 'react';

import useTopAlbums from '../../hooks/useTopAlbums';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import TopAlbums from './presenter';

const TopAlbumsContainer: FC = () => {
  const { data, hasError, isLoading } = useTopAlbums();

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <TopAlbums data={data} hasError={hasError} />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
