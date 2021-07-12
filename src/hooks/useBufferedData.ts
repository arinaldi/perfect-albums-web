import { useState } from 'react';
import useSWR from 'swr';

interface Data {
  data: string[] | undefined;
  hasError: boolean;
  isStale: boolean;
  update: () => void;
}

let quotesData: string[] = [];
const URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes/3';

async function fetcher() {
  try {
    const res = await window.fetch(URL);
    const data = await res.json();
    quotesData = [...data, ...quotesData];
    return quotesData;
  } catch (error) {
    throw new Error(error);
  }
}

function useBufferedData(): Data {
  const { data, error } = useSWR('quotes', fetcher);
  const [buffer, setBuffer] = useState(data);

  if (data && !buffer) setBuffer(data);

  return {
    data: buffer,
    hasError: Boolean(error),
    isStale: buffer !== data,
    update: () => setBuffer(data),
  };
}

export default useBufferedData;
