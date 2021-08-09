import { PER_PAGE, SORT_DIRECTION, SORT_VALUE } from '../constants';

export interface AlbumBase {
  aotd: boolean;
  artist: string;
  cd: boolean;
  favorite: boolean;
  title: string;
  year: string;
}

export interface AlbumData extends AlbumBase {
  _id: string;
  updatedAt: Date;
}

export interface Album extends AlbumBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  artist: string;
  title: string;
  year: string;
}

export interface Favorites {
  favorites: Favorite[];
}

export interface ReleaseBase {
  artist: string;
  title: string;
}

export interface ReleaseData extends ReleaseBase, Document {
  _id: string;
  date: Date | null;
}

export interface Release extends ReleaseBase {
  id: string;
  date: string | null;
}

export interface Releases {
  releases: Release[];
}

export interface SongBase {
  artist: string;
  title: string;
  link: string;
}

export interface SongData extends SongBase, Document {
  _id: string;
}

export interface Song extends SongBase {
  id: string;
}

export interface Songs {
  songs: Song[];
}

export interface GenericObject {
  [key: string]: string;
}

export interface QueryParams {
  direction: SORT_DIRECTION;
  page: number;
  perPage: PER_PAGE;
  search: string;
  sort: SORT_VALUE;
  [key: string]: string | number;
}

export type Callback = () => void;

export interface SwrPayload<T = unknown> {
  data: T | null;
  hasError: boolean;
  isLoading: boolean;
  mutate: () => void;
}

export interface AlbumInput {
  artist: string;
  title: string;
  year: string;
  cd: boolean;
  aotd: boolean;
  favorite: boolean;
}

export interface ReleaseInput {
  artist: string;
  title: string;
  date: string;
}

export interface SongInput {
  artist: string;
  title: string;
  link: string;
}
