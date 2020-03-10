import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

const SubmitButton = (props) => {
  const {
    isDisabled,
    isLoading,
    loadingText,
    text,
  } = props;

  return (
    <Button
      type='submit'
      variant='outline-dark'
      disabled={isDisabled}
    >
      {isLoading
        ? (
          <Fragment>
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
            <span className='sr-only'>{loadingText}</span>
          </Fragment>
        )
        : `${text}`
      }
    </Button>
  );
};

SubmitButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  text: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  loadingText: 'Loading...',
};

export default SubmitButton;
