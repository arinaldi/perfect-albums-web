import { FormEvent, useState } from 'react';
import type { UseFormHandleSubmit } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES } from '../constants';
import { Callback } from '../utils/types';

interface Options {
  callbacks: Callback[];
  handleSubmit?: UseFormHandleSubmit<any>;
  mutate?: () => void;
  submitFn: (data?: any) => Promise<void>;
  successMessage?: string;
}

interface Payload {
  isSubmitting: boolean;
  onSubmit: (event: FormEvent) => Promise<void>;
}

function useSubmit(options: Options): Payload {
  const { callbacks, handleSubmit, mutate, submitFn, successMessage } = options;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  async function handler(data?: any) {
    try {
      setIsSubmitting(true);
      await submitFn(data);
      setIsSubmitting(false);

      callbacks.forEach((cb: Callback) => {
        cb();
      });

      if (successMessage) {
        toast({
          description: successMessage,
          duration: 4000,
          isClosable: true,
          position: 'top-right',
          status: ALERT_TYPES.SUCCESS,
          title: MESSAGES.SUCCESS,
          variant: 'left-accent',
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof Error && error.message === MESSAGES.UNAUTHORIZED) {
        return;
      }

      toast({
        description: (error as any)?.message || MESSAGES.ERROR_GENERIC,
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        status: ALERT_TYPES.ERROR,
        title: MESSAGES.ERROR,
        variant: 'left-accent',
      });
    } finally {
      if (mutate) {
        mutate();
      }
    }
  }

  async function formSubmit(event: FormEvent) {
    event.preventDefault();
    await handler();
  }

  return {
    isSubmitting,
    onSubmit: handleSubmit ? handleSubmit(handler) : formSubmit,
  };
}

export default useSubmit;
