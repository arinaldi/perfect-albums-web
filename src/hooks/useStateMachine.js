import { useEffect, useReducer } from 'react';

import { useAppDispatch } from '../components/Provider';
import api from '../utils/api';
import { dataReducer, dataInitialState } from '../reducers/data';
import {
  STATE_EVENTS,
  STATE_STATUSES,
} from '../constants';

const useStateMachine = (path) => {
  const appDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const { status } = state;
  const controller = new AbortController();

  useEffect(() => {
    dispatch({ type: STATE_EVENTS.FETCH });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api(path, {
          dispatch: appDispatch,
          options: { signal: controller.signal },
        });

        dispatch({ type: STATE_EVENTS.RESOLVE, data });
      } catch (error) {
        if (error.name === 'AbortError') return;
        dispatch({ type: STATE_EVENTS.REJECT, error });
      }
    };

    if (status === STATE_STATUSES.LOADING) {
      fetchData();

      return () => {
        controller.abort();
      };
    }
  }, [appDispatch, controller, path, status]);

  return [state, dispatch];
};

export default useStateMachine;
