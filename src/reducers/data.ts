import { STATE_EVENTS, STATE_STATUSES } from '../constants';
import { Album } from '../utils/types';

export interface DataState {
  data: Album | null;
  error: Error | null;
  status: STATE_STATUSES;
}

interface FetchEvent {
  type: STATE_EVENTS.FETCH;
}

interface ResolveEvent {
  data: any;
  type: STATE_EVENTS.RESOLVE;
}

interface RejectEvent {
  error: Error;
  type: STATE_EVENTS.REJECT;
}

interface CancelEvent {
  type: STATE_EVENTS.CANCEL;
}

export type DataEvent = FetchEvent | ResolveEvent | RejectEvent | CancelEvent;

export const dataInitialState = {
  status: STATE_STATUSES.IDLE,
  data: null,
  error: null,
};

function loadingReducer (state: DataState, event: DataEvent): DataState {
  switch (event.type) {
  case STATE_EVENTS.CANCEL:
    return {
      ...state,
      status: STATE_STATUSES.IDLE,
      error: null,
    };
  case STATE_EVENTS.RESOLVE:
    return {
      status: STATE_STATUSES.SUCCESS,
      data: event.data,
      error: null,
    };
  case STATE_EVENTS.REJECT:
    return {
      ...state,
      status: STATE_STATUSES.FAILURE,
      error: event.error,
    };
  default:
    return state;
  }
}

function sharedReducer (state: DataState, event: DataEvent): DataState {
  switch (event.type) {
  case STATE_EVENTS.FETCH:
    return {
      ...state,
      status: STATE_STATUSES.LOADING,
      error: null,
    };
  default:
    return state;
  }
}

export function dataReducer (state: DataState, event: DataEvent): DataState {
  switch (state.status) {
  case STATE_STATUSES.IDLE:
  case STATE_STATUSES.SUCCESS:
  case STATE_STATUSES.FAILURE:
    return sharedReducer(state, event);
  case STATE_STATUSES.LOADING:
    return loadingReducer(state, event);
  default:
    return state;
  }
}
