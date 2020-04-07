import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import SignInContainer from '../../src/components/SignIn';
import mockApi from '../../src/utils/api';
import render from '../utils';

jest.mock('../../src/utils/api', () => (
  jest.fn(() => Promise.resolve({
    data: { token: 'token' },
  }))
));

afterAll(() => {
  mockApi.mockClear();
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

  expect(mockApi).toHaveBeenCalledTimes(1);
  expect(mockApi).toHaveBeenCalledWith(
    '/api/signin',
    { body: { username, password } },
  );

  await wait(() => {
    const titleHeader = queryByText('Sign In');
    expect(titleHeader).not.toBeInTheDocument();
  });
});
