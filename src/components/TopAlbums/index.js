import React from 'react';

import useStateMachine from '../../hooks/useStateMachine';
import {
  STATE_EVENTS,
  STATE_STATUSES,
} from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import TopAlbums from './presenter';

const TopAlbumsContainer = () => {
  const [state, dispatch] = useStateMachine('/api/favorites');
  const { data, status } = state;

  const cancel = () => {
    dispatch({ type: STATE_EVENTS.CANCEL });
  };

  const refresh = () => {
    dispatch({ type: STATE_EVENTS.FETCH });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={status === STATE_STATUSES.LOADING} />
      <TopAlbums
        cancel={cancel}
        data={data}
        refresh={refresh}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default TopAlbumsContainer;
