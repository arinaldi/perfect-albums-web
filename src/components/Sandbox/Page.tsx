import { FC } from 'react';
import useSWR from 'swr';
import { ListItem, Text, UnorderedList } from '@chakra-ui/react';

import { fetcher } from '../../utils/fetcher';
import { Album } from '../../utils/types';

interface Props {
  direction?: string;
  page: number;
  perPage: number;
  sort?: string;
}

const Page: FC<Props> = (props) => {
  const { direction = '', page, perPage, sort = '' } = props;
  const { data, error } = useSWR(
    `/api/albums?page=${page}&per_page=${perPage}&sort=${sort}&direction=${direction}`,
    fetcher,
    { dedupingInterval: 5000 },
  );

  if (!data) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <UnorderedList>
      {data.data.map((album: Album) => (
        <ListItem key={album.id}>
          {album.artist} – {album.title}
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default Page;
