import {
  BASE_URL,
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from '../constants';
import { getToken } from './storage';

const handleResponse = (res, dispatch) => {
  return new Promise((resolve, reject) => {
    if (res.status === 401) {
      if (res.url.includes('signin')) {
        reject(new Error(MESSAGES.SIGNIN));
      } else {
        reject(new Error(MESSAGES.UNAUTHORIZED));
        dispatch({
          type: DISPATCH_TYPES.SIGN_OUT_USER,
        });
        dispatch({
          payload: {
            message: MESSAGES.UNAUTHORIZED,
            type: TOAST_TYPES.ERROR,
          },
          type: DISPATCH_TYPES.OPEN_TOAST,
        });
      }
    } else if (!res.ok) {
      reject(new Error(MESSAGES.ERROR));
    }
    resolve(res);
  });
};

const api = (endpoint, options = {}) => {
  const { body, dispatch, ...customConfig } = options;
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${BASE_URL}${endpoint}`, config)
    .then(res => handleResponse(res, dispatch));
};

export default api;
