export const BASE_URL = process.env.API_URL;

export const PER_PAGE = [25, 50, 100];

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
  NONE = '',
}

export enum ALERT_TYPES {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export const MESSAGES = {
  ALBUM_PREFIX: 'Album successfully',
  SONG_PREFIX: 'Song successfully',
  RELEASE_PREFIX: 'Release successfully',
  UNAUTHORIZED: 'You are unauthorized to perform this operation',
  SIGNIN: 'Invalid username or password',
  ERROR: 'Something went wrong',
  NO_DATA: 'No Data',
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

export enum STATE_EVENTS {
  FETCH = 'fetch',
  RESOLVE = 'resolve',
  REJECT = 'reject',
  CANCEL = 'cancel',
}

export enum STATE_STATUSES {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const NAV_LINKS = [
  { label: 'Top Albums', to: '/top-albums', needsAuth: false },
  { label: 'Featured Songs', to: '/featured-songs', needsAuth: false },
  { label: 'New Releases', to: '/new-releases', needsAuth: false },
  { label: 'Admin', to: '/admin', needsAuth: true },
  { label: 'Sandbox', to: '/sandbox', needsAuth: true },
];
