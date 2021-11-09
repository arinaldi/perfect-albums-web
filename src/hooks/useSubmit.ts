import { FormEvent, useState } from 'react';
import type { UseFormHandleSubmit } from 'react-hook-form';
import { useColorMode, useToast } from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES, TOAST_OPTIONS } from '../constants';
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

export default function useSubmit(options: Options): Payload {
  const { callbacks, handleSubmit, mutate, submitFn, successMessage } = options;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const variant = colorMode === 'dark' ? 'solid' : 'left-accent';

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
          ...TOAST_OPTIONS,
          description: successMessage,
          status: ALERT_TYPES.SUCCESS,
          title: MESSAGES.SUCCESS,
          variant,
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof Error && error.message === MESSAGES.UNAUTHORIZED) {
        return;
      }

      toast({
        ...TOAST_OPTIONS,
        description: (error as any)?.message || MESSAGES.ERROR_GENERIC,
        status: ALERT_TYPES.ERROR,
        title: MESSAGES.ERROR,
        variant,
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
