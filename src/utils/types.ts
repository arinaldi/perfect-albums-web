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

export interface AlbumParams {
  id: string;
}

export enum Method {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export enum ModalDataType {
  default = 'Item',
  release = 'Release',
  song = 'Song',
}
