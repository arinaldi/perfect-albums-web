import React from 'react';

import useStateMachine from '../../hooks/useStateMachine';
import {
  DISPATCH_TYPES,
  MODAL_TYPES,
  STATE_EVENTS,
  STATE_STATUSES,
} from '../../constants';
import { useAppDispatch } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import NewReleases from './presenter';

const NewReleasesContainer = () => {
  const appDispatch = useAppDispatch();
  const [state, dispatch] = useStateMachine('/api/releases');
  const { data, status } = state;

  const cancel = () => {
    dispatch({ type: STATE_EVENTS.CANCEL });
  };

  const refresh = () => {
    dispatch({ type: STATE_EVENTS.FETCH });
  };

  const handleCreateOpen = () => {
    appDispatch({
      payload: {
        callback: refresh,
        type: MODAL_TYPES.NEW_RELEASE_CREATE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  const handleEditOpen = (data) => {
    appDispatch({
      payload: {
        callback: refresh,
        data: {
          ...data,
          dataType: 'Release',
          path: 'releases',
        },
        type: MODAL_TYPES.NEW_RELEASE_EDIT,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  const handleDeleteOpen = (data) => {
    appDispatch({
      payload: {
        callback: refresh,
        data: {
          ...data,
          dataType: 'Release',
          path: 'releases',
        },
        type: MODAL_TYPES.DATA_DELETE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  };

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={status === STATE_STATUSES.LOADING} />
      <NewReleases
        cancel={cancel}
        data={data}
        handleCreateOpen={handleCreateOpen}
        handleEditOpen={handleEditOpen}
        handleDeleteOpen={handleDeleteOpen}
        refresh={refresh}
        status={status}
      />
    </ErrorBoundary>
  );
};

export default NewReleasesContainer;
