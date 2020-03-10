import React from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

import { ALERT_TYPES, MESSAGES } from '../../constants';

const AppMessage = (props) => {
  const { type, message } = props;

  return (
    <div className='alert-container'>
      <Alert variant={type}>{message}</Alert>
    </div>
  );
};

AppMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

AppMessage.defaultProps = {
  type: ALERT_TYPES.ERROR,
  message: MESSAGES.ERROR,
};

export default AppMessage;
