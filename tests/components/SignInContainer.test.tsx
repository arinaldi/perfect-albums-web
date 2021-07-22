import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInContainer from '../../src/components/SignIn';
import mockApi from '../../src/utils/api';
import render from '../utils';

jest.mock('../../src/utils/api', () =>
  jest.fn(() =>
    Promise.resolve({
      data: { token: 'token' },
    }),
  ),
);

afterAll(() => {
  jest.clearAllMocks();
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

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);
  userEvent.click(submitButton);

  expect(mockApi).toHaveBeenCalledTimes(1);
  expect(mockApi).toHaveBeenCalledWith('/api/signin', {
    body: { username, password },
  });

  await waitFor(() => {
    const titleHeader = queryByText('Sign In');
    expect(titleHeader).not.toBeInTheDocument();
  });
});
