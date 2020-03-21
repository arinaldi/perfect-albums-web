import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

import Api from '../../utils/api';
import { getToken } from '../../utils/storage';
import { providerReducer, providerInitialState } from '../../reducers/provider';
import { DISPATCH_TYPES } from '../../constants';

export const StateContext = createContext();
export const DispatchContext = createContext();

const Provider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(providerReducer, providerInitialState);

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();

      if (token) {
        try {
          const res = await Api.get('/api/auth', { withAuth: true });

          if (res.status === 200) {
            dispatch({
              payload: token,
              type: DISPATCH_TYPES.SIGN_IN_USER,
            });
          } else {
            dispatch({
              type: DISPATCH_TYPES.SIGN_OUT_USER,
            });
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

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAppState = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a Provider');
  }

  return context;
};

const useAppDispatch = () => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a Provider');
  }

  return context;
};

const useApp = () => {
  return [useAppState(), useAppDispatch()];
};

export { Provider, useApp, useAppDispatch, useAppState };
