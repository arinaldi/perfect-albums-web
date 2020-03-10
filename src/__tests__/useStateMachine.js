import { renderHook } from '@testing-library/react-hooks';

import { mockTopAlbumsData } from '../__mocks__';
import mockApi from '../utils/api';
import useStateMachine from '../hooks/useStateMachine';

jest.mock('../utils/api', () => {
  return {
    get: jest.fn(),
  };
});

afterAll(() => {
  mockApi.get.mockClear();
});

test('useStateMachine handles successful data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockTopAlbumsData),
  }));
  const { result, waitForNextUpdate } = renderHook(() => useStateMachine());
  await waitForNextUpdate();
  const [state] = result.current;

  expect(state).toEqual({
    data: mockTopAlbumsData,
    error: null,
    status: 'success',
  });
});

test('useStateMachine handles error from data fetching', async () => {
  mockApi.get.mockImplementation(() => Promise.reject(new Error('error message')));
  const { result, waitForNextUpdate } = renderHook(() => useStateMachine());
  await waitForNextUpdate();
  const [state] = result.current;

  expect(state).toEqual({
    data: null,
    error: new Error('error message'),
    status: 'failure',
  });
});
