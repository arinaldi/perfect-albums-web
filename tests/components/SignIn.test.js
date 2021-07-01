import { render } from '@testing-library/react';

import SignIn from '../../src/components/SignIn/presenter';

const handleChange = () => jest.fn;
const handleSubmit = () => jest.fn;

test('SignIn renders with username and password inputs', () => {
  const { getByText, getByLabelText } = render(
    <SignIn
      onChange={handleChange}
      onSubmit={handleSubmit}
      password=''
      username=''
    />,
  );
  const titleHeader = getByText('Sign In');
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);

  expect(titleHeader).toBeInTheDocument();
  expect(usernameInput).toHaveAttribute('type', 'text');
  expect(usernameInput).toHaveAttribute('name', 'username');
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(passwordInput).toHaveAttribute('name', 'password');
});
