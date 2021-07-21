import { renderHook } from '@testing-library/react-hooks';

import mockApi from '../../src/utils/api';
import { Method } from '../../src/utils/types';
import useSubmit from '../../src/hooks/useSubmit';
import { mockAdminData } from '../mocks';

jest.mock('../../src/utils/api', () => jest.fn());
const mockedApi = mockApi as jest.Mock;

afterAll(() => {
  mockedApi.mockClear();
});

test('useSubmit handles successful data posting', async () => {
  mockedApi.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockAdminData[0]),
    }),
  );
  const options = {
    body: mockAdminData[0],
    callbacks: [jest.fn],
    method: Method.post,
    path: '/api/albums',
    successMessage: 'OK',
  };
  const { result } = renderHook(() => useSubmit(options));
  const state = result.current;

  expect(state).toEqual({
    handleSubmit: state.handleSubmit,
    isSaving: false,
  });
});
