import React from 'react';
import { render } from '@testing-library/react';

import AppMessage from '../../src/components/AppMessage/presenter';
import { ALERT_TYPES, MESSAGES } from '../../src/constants';

test('AppMessage renders error message', () => {
  const { getByText } = render(
    <AppMessage type={ALERT_TYPES.ERROR} message={MESSAGES.ERROR} />,
  );
  const div = getByText(MESSAGES.ERROR);

  expect(div).toBeInTheDocument();
  expect(div).toHaveClass('alert-danger');
  expect(div).toHaveAttribute('role', 'alert');
});

test('AppMessage renders success message', () => {
  const message = 'OK';
  const { getByText } = render(
    <AppMessage type={ALERT_TYPES.SUCCESS} message={message} />,
  );
  const div = getByText(message);

  expect(div).toBeInTheDocument();
  expect(div).toHaveClass('alert-success');
  expect(div).toHaveAttribute('role', 'alert');
});