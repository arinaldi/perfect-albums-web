import { gql } from '@apollo/client';

export const CREATE_RELEASE = gql`
  mutation CreateRelease($artist: String!, $title: String!, $date: Date) {
    createRelease(artist: $artist, title: $title, date: $date) {
      id
      artist
      title
      date
    }
  }
`;

export const EDIT_RELEASE = gql`
  mutation EditRelease($id: ID!, $artist: String!, $title: String!, $date: Date) {
    editRelease(id: $id, artist: $artist, title: $title, date: $date) {
      id
      artist
      title
      date
    }
  }
`;

export const DELETE_RELEASE = gql`
  mutation DeleteRelease($id: ID!) {
    deleteRelease(id: $id) {
      id
    }
  }
`;

export const CREATE_SONG = gql`
  mutation CreateSong($artist: String!, $title: String!, $link: String!) {
    createSong(artist: $artist, title: $title, link: $link) {
      id
      artist
      title
      link
    }
}
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;
