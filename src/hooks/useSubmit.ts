import { FormEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES } from '../constants';
import { Callback } from '../utils/types';

interface Options {
  callbacks: Callback[];
  mutate: () => void;
  submitFn: () => Promise<void>;
  successMessage: string;
}

interface Payload {
  handleSubmit: (event: FormEvent) => void;
  isSaving: boolean;
}

function useSubmit(options: Options): Payload {
  const { callbacks, mutate, submitFn, successMessage } = options;
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setIsSaving(true);
      await submitFn();
      setIsSaving(false);

      callbacks.forEach((cb: Callback) => {
        cb();
      });

      toast({
        description: successMessage,
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        status: ALERT_TYPES.SUCCESS,
        title: MESSAGES.SUCCESS,
        variant: 'left-accent',
      });
    } catch (error) {
      setIsSaving(false);
      if (error?.message === MESSAGES.UNAUTHORIZED) return;

      toast({
        description: error?.message || MESSAGES.ERROR_GENERIC,
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        status: ALERT_TYPES.ERROR,
        title: MESSAGES.ERROR,
        variant: 'left-accent',
      });
    } finally {
      mutate();
    }
  }

  return { handleSubmit, isSaving };
}

export default useSubmit;
