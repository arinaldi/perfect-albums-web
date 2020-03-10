import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import SignInContainer from '../components/SignIn';

import render from '../__test-utils__';
import mockApi from '../utils/api';

jest.mock('../utils/api', () => {
  return {
    post: jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ token: 'token' }),
    })),
  };
});

afterAll(() => {
  mockApi.post.mockClear();
});

test('SignInContainer submits credentials', async () => {
  const username = 'user';
  const password = '1234';
  const { getByLabelText, getByText, queryByText } = render(
    <SignInContainer />,
  );
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);
  const submitButton = getByText('Submit');

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(submitButton);

  expect(mockApi.post).toHaveBeenCalledTimes(1);
  expect(mockApi.post).toHaveBeenCalledWith(
    '/api/signin',
    { data: { username, password } },
  );

  await wait(() => {
    const titleHeader = queryByText('Sign In');
    expect(titleHeader).not.toBeInTheDocument();
  });
});
