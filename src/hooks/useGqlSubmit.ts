import { FormEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { MESSAGES } from '../constants';
import { Callback } from '../utils/types';

interface Options {
  callbacks: Callback[];
  submitFunc: () => Promise<void>;
  successMessage: string;
}

interface Payload {
  handleSubmit: (event: FormEvent) => void;
  isSaving: boolean;
}

function useGqlSubmit(options: Options): Payload {
  const { callbacks, submitFunc, successMessage } = options;
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSaving(true);

    try {
      await submitFunc();
      setIsSaving(false);

      callbacks.forEach((cb: Callback) => {
        cb();
      });

      toast({
        description: successMessage,
        duration: 4000,
        isClosable: true,
        status: 'success',
        title: 'Success',
      });
    } catch (err) {
      setIsSaving(false);
      toast({
        description: err.message || MESSAGES.ERROR,
        duration: 4000,
        isClosable: true,
        status: 'error',
        title: 'Error',
      });
    }
  }

  return {
    handleSubmit,
    isSaving,
  };
}

export default useGqlSubmit;
