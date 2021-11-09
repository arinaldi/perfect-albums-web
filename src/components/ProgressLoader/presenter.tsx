import { Progress } from '@chakra-ui/react';

interface Props {
  isVisible?: boolean;
}

export default function ProgressLoader({ isVisible = false }: Props) {
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
}
