import { createStandaloneToast } from '@chakra-ui/react';

import {
  ALERT_TYPES,
  BASE_URL,
  MESSAGES,
  METHODS,
  TOAST_OPTIONS,
} from '../constants';
import useStore from '../hooks/useStore';

function logout() {
  const toast = createStandaloneToast();

  useStore.getState().signOut();
  toast({
    ...TOAST_OPTIONS,
    description: MESSAGES.UNAUTHORIZED,
    status: ALERT_TYPES.ERROR,
    title: MESSAGES.ERROR,
  });
}

async function handleResponse(response: Response) {
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
}

interface Options {
  body?: any;
  [key: string]: any;
}

interface Config {
  body?: string;
  headers: HeadersInit; // eslint-disable-line no-undef
  method: METHODS;
}

export default async function api(
  endpoint: string,
  options: Options = {},
): Promise<any> {
  const { body, ...customConfig } = options;
  const token = useStore.getState().getSessionToken();
  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: Config = {
    method: body ? METHODS.POST : METHODS.GET,
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
