import create from 'zustand';

import api from '../utils/api';
import { getToken, removeToken, setToken } from '../utils/storage';

export interface AuthState {
  hasAuth: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const useAuth = create<AuthState>((set) => ({
  hasAuth: Boolean(getToken()),
  signIn: (token: string) => {
    setToken(token);
    set(() => ({ hasAuth: true }));
  },
  signOut: () => {
    removeToken();
    set(() => ({ hasAuth: false }));
  },
}));

async function checkUser() {
  const token = getToken();

  if (token) {
    try {
      const { status } = await api('/api/auth');

      if (status === 200) {
        useAuth.setState({ hasAuth: true });
      } else {
        throw new Error();
      }
    } catch (err) {
      removeToken();
      useAuth.setState({ hasAuth: false });
    }
  }
}

checkUser();

export default useAuth;
