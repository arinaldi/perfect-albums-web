import { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  isDisabled: boolean;
  isLoading: boolean;
  loadingText?: string;
  text: string;
}

const SubmitButton: FC<Props> = (props) => {
  const { isDisabled, isLoading, loadingText = 'Loading', text } = props;

  return (
    <Button
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingText={loadingText}
      type="submit"
      variant="outline"
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
