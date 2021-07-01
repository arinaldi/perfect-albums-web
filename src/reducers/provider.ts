import { getToken, removeToken, setToken } from '../utils/storage';
import { DISPATCH_TYPES, MODAL_TYPES } from '../constants';

interface Modal {
  callback?: any;
  data: any;
  isOpen: boolean;
  type: MODAL_TYPES;
}

interface User {
  isAuthenticated: boolean;
}

export interface State {
  modal: Modal;
  user: User;
}

interface OpenModalAction {
  payload: {
    callback?: () => void;
    data?: any;
    type: MODAL_TYPES;
  };
  type: DISPATCH_TYPES.OPEN_MODAL;
}

interface CloseModalAction {
  type: DISPATCH_TYPES.CLOSE_MODAL;
}

interface SignInAction {
  payload: string;
  type: DISPATCH_TYPES.SIGN_IN_USER;
}

interface SignOutAction {
  type: DISPATCH_TYPES.SIGN_OUT_USER;
}

export type Action = OpenModalAction | CloseModalAction | SignInAction | SignOutAction;

export const providerInitialState = {
  modal: {
    callback: null,
    data: null,
    isOpen: false,
    type: MODAL_TYPES.FEATURED_SONGS_CREATE,
  },
  user: {
    isAuthenticated: Boolean(getToken()),
  },
};

export function providerReducer (state: State, action: Action): State {
  switch (action.type) {
  case DISPATCH_TYPES.SIGN_IN_USER:
    setToken(action.payload);
    return {
      ...state,
      user: { isAuthenticated: true },
    };
  case DISPATCH_TYPES.SIGN_OUT_USER:
    removeToken();
    return {
      ...state,
      user: { isAuthenticated: false },
    };
  case DISPATCH_TYPES.OPEN_MODAL:
    return {
      ...state,
      modal: {
        callback: action.payload.callback,
        data: action.payload.data,
        isOpen: true,
        type: action.payload.type,
      },
    };
  case DISPATCH_TYPES.CLOSE_MODAL:
    return {
      ...state,
      modal: {
        ...state.modal,
        isOpen: false,
      },
    };
  default:
    return state;
  }
}
