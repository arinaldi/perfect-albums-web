export const BASE_URL = process.env.API_URL;

export const TOAST_TIMEOUT = 2500;
export const PER_PAGE = [25, 50, 100];

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'danger',
  INFO: 'dark',
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const MODAL_TYPES = {
  DATA_DELETE: 'Delete data',
  FEATURED_SONGS_CREATE: 'Create Featured Song',
  FEATURED_SONGS_DELETE: 'Delete Featured Song',
  NEW_RELEASE_CREATE: 'Create New Release',
  NEW_RELEASE_EDIT: 'Edit New Release',
};

export const MESSAGES = {
  ALBUM_PREFIX: 'Album successfully',
  SONG_PREFIX: 'Song successfully',
  RELEASE_PREFIX: 'Release successfully',
  UNAUTHORIZED: 'You are unauthorized to perform this operation',
  SIGNIN: 'Invalid username or password',
  ERROR: 'Something went wrong',
  NO_DATA: 'No Data',
};

export const ICONS = {
  CHECK: '✔',
  DOWN: '↓',
  UP: '↑',
  X: '✖',
  PENCIL: '✎',
};

export const DECADES = [
  {
    label: '10s',
    link: '#2019',
  },
  {
    label: '00s',
    link: '#2009',
  },
  {
    label: '90s',
    link: '#1999',
  },
  {
    label: '80s',
    link: '#1989',
  },
  {
    label: '70s',
    link: '#1976',
  },
];

export const STATE_EVENTS = {
  FETCH: 'fetch',
  RESOLVE: 'resolve',
  REJECT: 'reject',
  CANCEL: 'cancel',
};

export const STATE_STATUSES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

export const DISPATCH_TYPES = {
  SIGN_IN_USER: 'SIGN_IN_USER',
  SIGN_OUT_USER: 'SIGN_OUT_USER',
  OPEN_TOAST: 'OPEN_TOAST',
  CLOSE_TOAST: 'CLOSE_TOAST',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
};
