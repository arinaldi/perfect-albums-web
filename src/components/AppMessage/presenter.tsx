import { FC } from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES } from '../../constants';

interface Props {
  message?: string;
  type?: ALERT_TYPES;
}

const AppMessage: FC<Props> = ({ message = MESSAGES.ERROR, type = ALERT_TYPES.ERROR }) => (
  <Alert status={type}>
    <AlertIcon />
    {message}
  </Alert>
);

export default AppMessage;
