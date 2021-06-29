import { mutate } from 'swr';

import {
  BASE_URL,
  DISPATCH_TYPES,
  MESSAGES,
} from '../constants';
import { getToken } from './storage';

export const fetcher = async (url) => {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return window.fetch(`${BASE_URL}${url}`, { headers }).then(res => res.json());
};

export const fetchAndCache = (key) => {
  const request = fetcher(key);
  mutate(key, request, false);
  return request;
};

const logout = (dispatch, toast) => {
  dispatch({
    type: DISPATCH_TYPES.SIGN_OUT_USER,
  });
  toast({
    description: MESSAGES.UNAUTHORIZED,
    duration: 4000,
    isClosable: true,
    status: 'error',
    title: 'Error',
  });
};

const handleResponse = async (response, dispatch, toast) => {
  const { status, url } = response;

  if (status === 401) {
    if (url.includes('signin')) {
      return Promise.reject(new Error(MESSAGES.SIGNIN));
    } else {
      logout(dispatch, toast);
      return Promise.reject(new Error(MESSAGES.UNAUTHORIZED));
    }
  }

  const data = await response.json();

  if (response.ok) {
    return { data, status };
  } else {
    return Promise.reject(data);
  }
};

const api = async (endpoint, options = {}) => {
  const { body, dispatch, toast, ...customConfig } = options;
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

  const response = await window.fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response, dispatch, toast);
};

export default api;
