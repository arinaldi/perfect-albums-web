import {
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from '../constants';
import { getToken } from './storage';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://perfectalbums.herokuapp.com'
  : 'http://localhost:3001';

const getHeaders = (withAuth = false) => {
  const headers = { 'Content-Type': 'application/json' };

  if (withAuth) {
    headers.authorization = `Bearer ${getToken()}`;
  }

  return headers;
};

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

const Api = {
  get: (endpoint, withAuth = false, options = {}) => (
    fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers: getHeaders(withAuth),
    }).then(res => handleResponse(res))
  ),
  post: (endpoint, { data, dispatch }) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }).then(res => handleResponse(res, dispatch))
  ),
  put: (endpoint, { data, dispatch }) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data),
    }).then(res => handleResponse(res, dispatch))
  ),
  delete: (endpoint, { dispatch }) => (
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    }).then(res => handleResponse(res, dispatch))
  ),
};

export default Api;
