import { useEffect, useReducer } from 'react';

import { useAppDispatch } from '../components/Provider';
import Api from '../utils/api';
import { dataReducer, dataInitialState } from '../reducers/data';
import {
  STATE_EVENTS,
  STATE_STATUSES,
} from '../constants';

const useStateMachine = (path, withAuth = false) => {
  const appDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const { status } = state;
  const controller = new AbortController();

  useEffect(() => {
    dispatch({ type: STATE_EVENTS.FETCH });
  }, []);

  useEffect(() => {
    if (status === STATE_STATUSES.LOADING) {
      Api.get(path, {
        dispatch: appDispatch,
        options: { signal: controller.signal },
        withAuth,
      })
        .then(res => res.json())
        .then(data => {
          dispatch({ type: STATE_EVENTS.RESOLVE, data });
        })
        .catch(error => {
          if (error.name === 'AbortError') return;
          dispatch({ type: STATE_EVENTS.REJECT, error });
        });

      return () => {
        controller.abort();
      };
    }
  }, [appDispatch, controller, path, status, withAuth]);

  return [state, dispatch];
};

export default useStateMachine;
