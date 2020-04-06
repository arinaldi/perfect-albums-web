import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import PropTypes from 'prop-types';

import { mockTopAlbumsData } from '../__mocks__';
import mockApi from '../utils/api';
import useStateMachine from '../hooks/useStateMachine';
import { Provider } from '../components/Provider';

jest.mock('../utils/api', () => jest.fn());

afterAll(() => {
  mockApi.mockClear();
});

const wrapper = ({ children }) => <Provider>{children}</Provider>;
wrapper.propTypes = { children: PropTypes.object };

test('useStateMachine handles successful data fetching', async () => {
  mockApi.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockTopAlbumsData),
  }));
  const { result, waitForNextUpdate } = renderHook(() => useStateMachine('/top-albums', false), { wrapper });
  await waitForNextUpdate();
  const [state] = result.current;

  expect(state).toEqual({
    data: mockTopAlbumsData,
    error: null,
    status: 'success',
  });
});

test('useStateMachine handles error from data fetching', async () => {
  mockApi.mockImplementation(() => Promise.reject(new Error('error message')));
  const { result, waitForNextUpdate } = renderHook(() => useStateMachine('/top-albums', false), { wrapper });
  await waitForNextUpdate();
  const [state] = result.current;

  expect(state).toEqual({
    data: null,
    error: new Error('error message'),
    status: 'failure',
  });
});
