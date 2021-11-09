import { Button } from '@chakra-ui/react';

interface Props {
  isSubmitting: boolean;
  loadingText?: string;
  text: string;
}

export default function SubmitButton({
  isSubmitting,
  loadingText = 'Loading',
  text,
}: Props) {
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
}
