import React from 'react';
import Toast from 'react-bootstrap/Toast';

import { DISPATCH_TYPES, TOAST_TIMEOUT } from '../../constants';
import { useApp } from '../Provider';

const ToastAlert = () => {
  const [state, dispatch] = useApp();
  const { isOpen, message, type } = state.toast;
  const zIndex = isOpen ? 99 : 0;

  const closeToast = () => {
    dispatch({
      type: DISPATCH_TYPES.CLOSE_TOAST,
    });
  };

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      style={{
        position: 'relative',
        zIndex,
      }}
    >
      <Toast
        onClose={closeToast}
        show={isOpen}
        delay={TOAST_TIMEOUT}
        autohide
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          minWidth: '300px',
        }}
      >
        <Toast.Header className={type}>
          <strong className='mr-auto capitalize'>{type}</strong>
        </Toast.Header>
        <Toast.Body style={{ backgroundColor: 'white' }}>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastAlert;
