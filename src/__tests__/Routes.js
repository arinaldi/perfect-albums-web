import React from 'react';
import { wait } from '@testing-library/react';

import Routes from '../components/Routes';

import render from '../__test-utils__';
import { mockTopAlbumsData } from '../__mocks__';
import mockApi from '../utils/api';

jest.mock('../utils/api', () => {
  return {
    get: jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockTopAlbumsData),
    })),
  };
});

afterAll(() => {
  mockApi.get.mockClear();
});

test('Landing on a bad page redirects to albums', async () => {
  const { getByTestId } = render(
    <Routes />,
    '/something-that-does-not-match',
  );

  await wait(() => expect(getByTestId('list-1991')).toBeInTheDocument());
  await wait(() => expect(getByTestId('list-1999')).toBeInTheDocument());
});
