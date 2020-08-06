import React from 'react';
import Button from 'react-bootstrap/Button';

import useBufferedData from '../../hooks/useBufferedData';

const LoadMore = () => {
  const { data, error, isStale, update } = useBufferedData();

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {isStale && (
        <Button variant='outline-dark' onClick={update}>
          Load More
        </Button>
      )}
      <ul>
        {data.map((quote, index) => (
          <li key={index}>{quote}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoadMore;
