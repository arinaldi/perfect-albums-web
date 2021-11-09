import { Alert, AlertIcon } from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES } from '../../constants';

interface Props {
  message?: string;
  type?: ALERT_TYPES;
}

export default function AppMessage({
  message = MESSAGES.ERROR_GENERIC,
  type = ALERT_TYPES.ERROR,
}: Props) {
  return (
    <Alert status={type} variant="left-accent">
      <AlertIcon />
      {message}
    </Alert>
  );
}
