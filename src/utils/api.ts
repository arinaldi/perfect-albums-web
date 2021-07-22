import { createStandaloneToast } from '@chakra-ui/react';

import { BASE_URL, MESSAGES } from '../constants';
import useStore from '../hooks/useStore';
import { getToken } from './storage';
import { Method } from './types';

const logout = () => {
  const toast = createStandaloneToast();

  useStore.getState().signOut();
  toast({
    description: MESSAGES.UNAUTHORIZED,
    duration: 4000,
    isClosable: true,
    status: 'error',
    title: 'Error',
  });
};

const handleResponse = async (response: Response) => {
  const { status, url } = response;

  if (status === 401) {
    if (url.includes('signin')) {
      return Promise.reject(new Error(MESSAGES.SIGNIN));
    } else {
      logout();
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
  const { body, ...customConfig } = options;
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
  return handleResponse(response);
}

export default api;
