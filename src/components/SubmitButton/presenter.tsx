import { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  isSubmitting: boolean;
  loadingText?: string;
  text: string;
}

const SubmitButton: FC<Props> = (props) => {
  const { isSubmitting, loadingText = 'Loading', text } = props;

  return (
    <Button
      isDisabled={isSubmitting}
      isLoading={isSubmitting}
      loadingText={loadingText}
      type="submit"
      variant="outline"
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
