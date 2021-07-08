import { getToken, removeToken, setToken } from '../utils/storage';
import { DISPATCH_TYPES } from '../constants';

export interface User {
  isAuthenticated: boolean;
}

export interface State {
  user: User;
}

interface SignInAction {
  payload: string;
  type: DISPATCH_TYPES.SIGN_IN_USER;
}

interface SignOutAction {
  type: DISPATCH_TYPES.SIGN_OUT_USER;
}

export type Action = SignInAction | SignOutAction;

export const providerInitialState = {
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
  default:
    return state;
  }
}
