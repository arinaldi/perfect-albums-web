import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import PropTypes from 'prop-types';

import { mockTopAlbumsData } from '../mocks';
import mockApi from '../../src/utils/api';
import useStateMachine from '../../src/hooks/useStateMachine';
import { Provider } from '../../src/components/Provider';

jest.mock('../../src/utils/api', () => jest.fn());

afterAll(() => {
  mockApi.mockClear();
});

const wrapper = ({ children }) => <Provider>{children}</Provider>;
wrapper.propTypes = { children: PropTypes.object };

test('useStateMachine handles successful data fetching', async () => {
  mockApi.mockImplementation(() => Promise.resolve({
    data: mockTopAlbumsData,
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
