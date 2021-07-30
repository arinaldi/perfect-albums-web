import { FormEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES } from '../constants';
import { Callback } from '../utils/types';

interface Options {
  callbacks: Callback[];
  submitFn: () => Promise<void>;
  successMessage: string;
}

interface Payload {
  handleSubmit: (event: FormEvent) => void;
  isSaving: boolean;
}

function useSubmit(options: Options): Payload {
  const { callbacks, submitFn, successMessage } = options;
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
        status: ALERT_TYPES.SUCCESS,
        title: MESSAGES.SUCCESS,
      });
    } catch (err) {
      setIsSaving(false);
      if (err.message !== MESSAGES.UNAUTHORIZED) {
        toast({
          description: err.message || MESSAGES.ERROR_GENERIC,
          duration: 4000,
          isClosable: true,
          status: ALERT_TYPES.ERROR,
          title: MESSAGES.ERROR,
        });
      }
    }
  }

  return {
    handleSubmit,
    isSaving,
  };
}

export default useSubmit;
