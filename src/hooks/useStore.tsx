import { FC, useEffect } from 'react';
import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SWRConfig } from 'swr';
import { Provider, Session, User } from '@supabase/supabase-js';
import { GraphQLClient, request } from 'graphql-request';

import { BASE_URL, GQL_URL } from '../constants';
import supabase from '../utils/supabase';

interface Response {
  error: Error | null;
  data: Session | null;
  provider?: Provider | undefined;
  session: Session | null;
  url?: string | null | undefined;
  user: User | null;
}

interface ErrorResponse {
  error: Error | null;
}

interface AuthState {
  getSessionToken: () => string;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<Response>;
  signOut: () => Promise<ErrorResponse>;
  user: User | null | undefined;
}

export const graphQLClient = new GraphQLClient(GQL_URL, { headers: {} });

const { auth } = supabase;
let supabaseSession: Session | null;

const store = (set: SetState<AuthState>) => ({
  getSessionToken: () => auth.session()?.access_token || '',
  setUser: (user: User | null) => {
    set({ user });
  },
  signIn: async (email: string, password: string) =>
    await auth.signIn({ email, password }),
  signOut: async () => await auth.signOut(),
  user: undefined,
});

const useStore = create<AuthState>(
  import.meta.env.DEV ? devtools(store) : store,
);

auth.onAuthStateChange((_, session) => {
  const user = session?.user || null;
  supabaseSession = session;

  if (session) {
    graphQLClient.setHeader('authorization', `Bearer ${session.access_token}`);
  }

  useStore.setState({ user });
});

export async function fetcher(url: string): Promise<any> {
  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (supabaseSession) {
    const token = supabaseSession.access_token;
    headers.authorization = `Bearer ${token}`;
  }

  return window
    .fetch(`${BASE_URL}${url}`, { headers })
    .then((res) => res.json());
}

export function gqlFetcher(query: string): Promise<any> {
  return request(GQL_URL, query);
}

export const SWRProvider: FC = ({ children }) => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (user === undefined && auth.session() === null) {
      setUser(null);
    }
  }, [setUser, user]);

  if (user === undefined) return null;

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default useStore;
