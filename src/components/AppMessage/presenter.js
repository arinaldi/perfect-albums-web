import { Alert, AlertIcon } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { ALERT_TYPES, MESSAGES } from '../../constants';

const AppMessage = ({ type, message }) => (
  <Alert status={type}>
    <AlertIcon />
    {message}
  </Alert>
);

AppMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

AppMessage.defaultProps = {
  type: ALERT_TYPES.ERROR,
  message: MESSAGES.ERROR,
};

export default AppMessage;
