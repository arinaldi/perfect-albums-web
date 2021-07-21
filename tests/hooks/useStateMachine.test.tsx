import { renderHook } from '@testing-library/react-hooks';

import { mockTopAlbumsData } from '../mocks';
import mockApi from '../../src/utils/api';
import useStateMachine from '../../src/hooks/useStateMachine';

jest.mock('../../src/utils/api', () => jest.fn());
const mockedApi = mockApi as jest.Mock;

afterAll(() => {
  mockedApi.mockClear();
});

test('useStateMachine handles successful data fetching', async () => {
  mockedApi.mockImplementation(() =>
    Promise.resolve({
      data: mockTopAlbumsData,
    }),
  );
  const { result, waitForNextUpdate } = renderHook(() =>
    useStateMachine('/top-albums'),
  );
  await waitForNextUpdate();
  const [state] = result.current;

  expect(state).toEqual({
    data: mockTopAlbumsData,
    error: null,
    status: 'success',
  });
});

test('useStateMachine handles error from data fetching', async () => {
  mockedApi.mockImplementation(() =>
    Promise.reject(new Error('error message')),
  );
  const { result, waitForNextUpdate } = renderHook(() =>
    useStateMachine('/top-albums'),
  );
  await waitForNextUpdate();
  const [state] = result.current;

  expect(state).toEqual({
    data: null,
    error: new Error('error message'),
    status: 'failure',
  });
});
