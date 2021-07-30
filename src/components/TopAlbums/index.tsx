import { FC } from 'react';

import useTopAlbums from '../../hooks/useTopAlbums';
import useTitle from '../../hooks/useTitle';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import TopAlbums from './presenter';

const TopAlbumsContainer: FC = () => {
  const { data, hasError, isLoading } = useTopAlbums();
  useTitle('Top Albums');

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <TopAlbums data={data} hasError={hasError} />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
