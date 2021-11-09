import { useState } from 'react';
import useSWR from 'swr';

import { MESSAGES } from '../constants/index';

interface Data {
  data: string[] | undefined;
  hasError: boolean;
  isStale: boolean;
  update: () => void;
}

let quotesData: string[] = [];
const URL = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes/3';

async function customFetcher() {
  try {
    const res = await window.fetch(URL);
    const data = await res.json();
    quotesData = [...data, ...quotesData];
    return quotesData;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : MESSAGES.ERROR_GENERIC;
    throw new Error(message);
  }
}

export default function useBufferedData(): Data {
  const { data, error } = useSWR('quotes', customFetcher);
  const [buffer, setBuffer] = useState(data);

  if (data && !buffer) setBuffer(data);

  return {
    data: buffer,
    hasError: Boolean(error),
    isStale: buffer !== data,
    update: () => setBuffer(data),
  };
}
