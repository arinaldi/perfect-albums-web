import { gql } from 'apollo-boost';

export const GET_FAVORITES = gql`
{
  favorites {
    artist
    title
    year
  }
}
`;

export const GET_RELEASES = gql`
{
  releases {
    id
    artist
    title
    date
  }
}
`;

export const GET_SONGS = gql`
{
  songs {
    id
    artist
    title
    link
  }
}
`;
