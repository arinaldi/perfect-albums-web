import AppMessage from '../../src/components/AppMessage/presenter';
import { ALERT_TYPES, MESSAGES } from '../../src/constants';
import render from '../utils';

test('AppMessage renders error message', () => {
  const { getByText } = render(
    <AppMessage type={ALERT_TYPES.ERROR} message={MESSAGES.ERROR} />,
  );
  const div = getByText(MESSAGES.ERROR);

  expect(div).toBeInTheDocument();
  expect(div).toHaveClass('chakra-alert');
  expect(div).toHaveAttribute('role', 'alert');
});

test('AppMessage renders success message', () => {
  const message = 'OK';
  const { getByText } = render(
    <AppMessage type={ALERT_TYPES.SUCCESS} message={message} />,
  );
  const div = getByText(message);

  expect(div).toBeInTheDocument();
  expect(div).toHaveClass('chakra-alert');
  expect(div).toHaveAttribute('role', 'alert');
});
