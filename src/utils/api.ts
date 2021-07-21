import { mutate } from 'swr';
import { createStandaloneToast } from '@chakra-ui/react';

import { BASE_URL, MESSAGES } from '../constants';
import { getToken } from './storage';
import { Method, SignOut } from './types';

export async function fetcher(url: string): Promise<any> {
  const token = getToken();
  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return window
    .fetch(`${BASE_URL}${url}`, { headers })
    .then((res) => res.json());
}

export function fetchAndCache(key: string): Promise<any> {
  const request = fetcher(key);
  mutate(key, request, false);
  return request;
}

const logout = (signOut: SignOut) => {
  const toast = createStandaloneToast();

  signOut();
  toast({
    description: MESSAGES.UNAUTHORIZED,
    duration: 4000,
    isClosable: true,
    status: 'error',
    title: 'Error',
  });
};

const handleResponse = async (response: Response, signOut: SignOut) => {
  const { status, url } = response;

  if (status === 401) {
    if (url.includes('signin')) {
      return Promise.reject(new Error(MESSAGES.SIGNIN));
    } else {
      logout(signOut);
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

async function api(endpoint: string, options: Options = {}): Promise<any> {
  const { body, signOut, ...customConfig } = options;
  const token = getToken();
  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {
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
  return handleResponse(response, signOut);
}

export default api;
