import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import { fetcher } from '../../utils/api';

function Page (props) {
  const { page } = props;
  const { data, error } = useSWR(
    `/api/albums?page=${page}&per_page=10`,
    fetcher,
    { dedupingInterval: 5000 },
  );

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <ul>
      {data.data.map(item => (
        <li key={item.id}>
          {item.artist} – {item.title}
        </li>
      ))}
    </ul>
  );
}

Page.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Page;
