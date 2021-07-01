import { Button } from '@chakra-ui/react';
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
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingText={loadingText}
      type='submit'
      variant='outline'
    >
      {text}
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
  loadingText: 'Loading',
};

export default SubmitButton;
