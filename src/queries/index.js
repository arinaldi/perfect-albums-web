import { gql } from 'apollo-boost';

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
