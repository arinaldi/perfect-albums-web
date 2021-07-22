import create from 'zustand';
import { devtools } from 'zustand/middleware';

import api from '../utils/api';
import { getToken, removeToken, setToken } from '../utils/storage';

export interface AuthState {
  hasAuth: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const useStore = create<AuthState>(
  devtools((set) => ({
    hasAuth: Boolean(getToken()),
    signIn: (token: string) => {
      setToken(token);
      set(() => ({ hasAuth: true }));
    },
    signOut: () => {
      removeToken();
      set(() => ({ hasAuth: false }));
    },
  })),
);

async function checkUser() {
  const token = getToken();

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
