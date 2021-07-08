import { Dispatch } from 'react';
import { mutate } from 'swr';
import { createStandaloneToast } from '@chakra-ui/react';

import {
  BASE_URL,
  DISPATCH_TYPES,
  MESSAGES,
} from '../constants';
import { Action } from '../reducers/provider';
import { getToken } from './storage';
import { Method } from './types';

export async function fetcher (url: string): Promise<any> {
  const token = getToken();
  const headers: HeadersInit = { // eslint-disable-line no-undef
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return window.fetch(`${BASE_URL}${url}`, { headers }).then(res => res.json());
}

export function fetchAndCache (key: string): Promise<any> {
  const request = fetcher(key);
  mutate(key, request, false);
  return request;
}

const logout = (dispatch: Dispatch<Action>) => {
  const toast = createStandaloneToast();

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

const handleResponse = async (response: Response, dispatch: Dispatch<Action>) => {
  const { status, url } = response;

  if (status === 401) {
    if (url.includes('signin')) {
      return Promise.reject(new Error(MESSAGES.SIGNIN));
    } else {
      logout(dispatch);
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

interface Options {
  body?: any;
  [key: string]: any;
}

interface Config {
  body?: string;
  headers: HeadersInit; // eslint-disable-line no-undef
  method: Method;
}

async function api (endpoint: string, options: Options = {}): Promise<any> {
  const { body, dispatch, ...customConfig } = options;
  const token = getToken();
  const headers: HeadersInit = { // eslint-disable-line no-undef
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: Config = {
    method: body ? Method.post : Method.get,
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
  return handleResponse(response, dispatch);
}

export default api;
