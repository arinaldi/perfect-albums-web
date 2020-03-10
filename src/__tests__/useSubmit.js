import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { mockAdminData } from '../__mocks__';
import mockApi from '../utils/api';
import useSubmit from '../hooks/useSubmit';
import { Provider } from '../components/Provider';

jest.mock('../utils/api', () => {
  return {
    post: jest.fn(),
  };
});

afterAll(() => {
  mockApi.post.mockClear();
});

test('useSubmit handles successful data posting', async () => {
  mockApi.post.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockAdminData[0]),
  }));
  const options = {
    apiFunc: mockApi.post,
    callbacks: [jest.fn],
    data: mockAdminData[0],
    path: '/api/albums',
    successMessage: 'OK',
  };
  const wrapper = ({ children }) => <Provider>{children}</Provider>;
  const { result } = renderHook(() => useSubmit(options), { wrapper });
  const state = result.current;

  expect(state).toEqual({
    handleSubmit: state.handleSubmit,
    isSaving: false,
    isValidated: false,
  });
});
