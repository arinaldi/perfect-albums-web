import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

import api from '../utils/api';
import { getToken, removeToken, setToken } from '../utils/storage';

export interface AuthState {
  hasAuth: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const token = getToken();

const store = (set: SetState<AuthState>) => ({
  hasAuth: Boolean(token),
  signIn: (token: string) => {
    setToken(token);
    set(() => ({ hasAuth: true }));
  },
  signOut: () => {
    removeToken();
    set(() => ({ hasAuth: false }));
  },
});

const useStore = create<AuthState>(
  process.env.NODE_ENV === 'development' ? devtools(store) : store,
);

async function checkUser() {
  if (token) {
    try {
      const { status } = await api('/api/auth');

      if (status === 200) {
        useStore.setState({ hasAuth: true });
      } else {
        throw new Error();
      }
    } catch (err) {
      removeToken();
      useStore.setState({ hasAuth: false });
    }
  }
}

checkUser();

export default useStore;
