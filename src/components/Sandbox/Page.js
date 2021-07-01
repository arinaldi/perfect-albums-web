import useSWR from 'swr';
import { ListItem, Text, UnorderedList } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { fetcher } from '../../utils/api';

function Page (props) {
  const { direction, page, perPage, sort } = props;
  const { data, error } = useSWR(
    `/api/albums?page=${page}&per_page=${perPage}&sort=${sort}&direction=${direction}`,
    fetcher,
    { dedupingInterval: 5000 },
  );

  if (!data) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <UnorderedList>
      {data.data.map(item => (
        <ListItem key={item.id}>
          {item.artist} – {item.title}
        </ListItem>
      ))}
    </UnorderedList>
  );
}

Page.propTypes = {
  direction: PropTypes.string,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  sort: PropTypes.string,
};

Page.defaultProps = {
  direction: '',
  sort: '',
};

export default Page;
