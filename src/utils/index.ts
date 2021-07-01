import { MONTHS } from '../constants';
import { Favorite, Release } from './types';

interface Results {
  [key: string]: any;
}

type Tuple = [any, any];

export function sortByDate (a: Tuple, b: Tuple): number {
  const dateA = a[0] === 'TBD'
    ? a[0]
    : new Date(a[0]).toISOString();
  const dateB = b[0] === 'TBD'
    ? b[0]
    : new Date(b[0]).toISOString();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

export function sortDesc (a: Tuple, b: Tuple): number {
  return b[0] - a[0];
}

export function getQuery (query: string): string {
  return decodeURI(query.substring(1));
}

function addZeroPrefix (value: number) {
  return value < 10 ? `0${value}` : value.toString();
}

export function formatDate (isoString: string): string {
  if (!isoString) return '';

  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${year}-${addZeroPrefix(month)}-${addZeroPrefix(day)}`;
};

export function formatFavorites (favorites: Favorite[]): Results {
  const results: Results = {};

  favorites.forEach(({ artist, title, year }) => {
    const album = { artist, title };

    if (results[year]) {
      results[year].push(album);
    } else {
      results[year] = [album];
    }
  });

  return results;
}

function formatReleaseDate (isoString: string): string {
  const newDate = new Date(isoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();

  return `${date} ${MONTHS[month]} ${year}`;
}

export function formatReleases (releases: Release[]): Results {
  const results: Results = {};

  releases.forEach((release) => {
    const releaseDate = release.date
      ? formatReleaseDate(release.date)
      : 'TBD';

    if (results[releaseDate]) {
      results[releaseDate].push(release);
    } else {
      results[releaseDate] = [release];
    }
  });

  return results;
}
