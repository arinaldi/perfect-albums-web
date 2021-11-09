import useSWR from 'swr';
import { ListItem, Text, UnorderedList } from '@chakra-ui/react';

import { Album } from '../../utils/types';

interface Props {
  direction?: string;
  page: number;
  perPage: number;
  sort?: string;
}

export default function Page({
  direction = '',
  page,
  perPage,
  sort = '',
}: Props) {
  const { data, error } = useSWR(
    `/api/albums?page=${page}&per_page=${perPage}&sort=${sort}&direction=${direction}`,
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
}
