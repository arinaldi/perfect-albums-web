import { STATE_EVENTS, STATE_STATUSES } from '../constants';

export const dataInitialState = {
  status: STATE_STATUSES.IDLE,
  data: null,
  error: null,
};

const loadingReducer = (state, event) => {
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
};

const sharedReducer = (state, event) => {
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
};

export const dataReducer = (state, event) => {
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
};
