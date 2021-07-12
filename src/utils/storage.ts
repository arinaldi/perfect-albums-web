import Cookies from 'js-cookie';

const KEY = 'perfectalbums';

export function setToken(token: string): void {
  Cookies.set(KEY, token, { expires: 7 });
}

export function getToken(): string {
  return Cookies.get(KEY) || '';
}

export function removeToken(): void {
  Cookies.remove(KEY);
}
