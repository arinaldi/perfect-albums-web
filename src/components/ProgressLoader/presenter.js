import { Progress } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ProgressLoader = ({ isVisible }) => {
  const visibility = isVisible ? 'visible' : 'hidden';

  return (
    <Progress
      colorScheme="gray"
      hasStripe
      isAnimated
      marginBottom={2}
      style={{ visibility }}
      value={100}
    />
  );
};

ProgressLoader.propTypes = {
  isVisible: PropTypes.bool,
};

ProgressLoader.defaultProps = {
  isVisible: false,
};

export default ProgressLoader;
