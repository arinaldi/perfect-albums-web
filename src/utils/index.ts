import { MONTHS } from '../constants';
import { Favorite, Release } from './types';

type Tuple = [any, any];

export function sortByDate(a: Tuple, b: Tuple): number {
  const dateA = a[0] === 'TBD' ? a[0] : new Date(a[0]).toISOString();
  const dateB = b[0] === 'TBD' ? b[0] : new Date(b[0]).toISOString();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

export function sortDesc(a: Tuple, b: Tuple): number {
  return b[0] - a[0];
}

function addZeroPrefix(value: number) {
  return value < 10 ? `0${value}` : value.toString();
}

export function formatDate(isoString: string): string {
  if (!isoString) return '';

  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${year}-${addZeroPrefix(month)}-${addZeroPrefix(day)}`;
}

interface FavoriteResults {
  [key: string]: Favorite[];
}

export function formatFavorites(favorites: Favorite[]): FavoriteResults {
  const results: FavoriteResults = {};

  favorites.forEach((favorite: Favorite) => {
    const { year } = favorite;

    if (results[year]) {
      results[year].push(favorite);
    } else {
      results[year] = [favorite];
    }
  });

  return results;
}

function formatReleaseDate(isoString: string): string {
  const newDate = new Date(isoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();

  return `${date} ${MONTHS[month]} ${year}`;
}

interface ReleaseResults {
  [key: string]: Release[];
}

export function formatReleases(releases: Release[]): ReleaseResults {
  const results: ReleaseResults = {};

  releases.forEach((release: Release) => {
    const releaseDate = release.date ? formatReleaseDate(release.date) : 'TBD';

    if (results[releaseDate]) {
      results[releaseDate].push(release);
    } else {
      results[releaseDate] = [release];
    }
  });

  return results;
}
