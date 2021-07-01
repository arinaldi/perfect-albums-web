import { FC } from 'react';
import { Progress } from '@chakra-ui/react';

interface Props {
  isVisible?: boolean;
}

const ProgressLoader: FC<Props> = ({ isVisible = false }) => {
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

export default ProgressLoader;
