import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import api from '../../utils/api';
import { getToken } from '../../utils/storage';
import {
  Action,
  providerReducer,
  providerInitialState,
  State,
} from '../../reducers/provider';
import { DISPATCH_TYPES } from '../../constants';

export const StateContext = createContext<State>(providerInitialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => undefined);

interface Props {
  children: ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(providerReducer, providerInitialState);

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();

      if (token) {
        try {
          const { status } = await api('/api/auth');

          if (status === 200) {
            dispatch({
              payload: token,
              type: DISPATCH_TYPES.SIGN_IN_USER,
            });
          } else {
            throw new Error();
          }
        } catch (err) {
          dispatch({
            type: DISPATCH_TYPES.SIGN_OUT_USER,
          });
        }
      }
    };

    checkUser();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

function useAppState (): State {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a Provider');
  }

  return context;
}

function useAppDispatch (): Dispatch<Action> {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a Provider');
  }

  return context;
}

function useApp (): [State, Dispatch<Action>] {
  return [useAppState(), useAppDispatch()];
}

export { Provider, useApp, useAppDispatch, useAppState };
