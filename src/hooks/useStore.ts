import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Provider, Session, User } from '@supabase/supabase-js';

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
  hasAuth: boolean;
  getSessionToken: () => string;
  signIn: (email: string, password: string) => Promise<Response>;
  signOut: () => Promise<ErrorResponse>;
}

const { auth } = supabase;

const store = () => ({
  hasAuth: Boolean(auth.user()),
  getSessionToken: () => auth.session()?.access_token || '',
  signIn: async (email: string, password: string) =>
    await auth.signIn({ email, password }),
  signOut: async () => await auth.signOut(),
});

const useStore = create<AuthState>(
  import.meta.env.DEV ? devtools(store) : store,
);

auth.onAuthStateChange((_, session) => {
  const hasAuth = Boolean(session?.user);

  if (!hasAuth) {
    useStore.getState().signOut();
  }

  useStore.setState({ hasAuth });
});

export default useStore;
