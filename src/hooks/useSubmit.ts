import { FormEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ALERT_TYPES, MESSAGES } from '../constants';
import api from '../utils/api';
import { AlbumBase, Callback } from '../utils/types';

interface Options {
  body?: AlbumBase;
  callbacks: Callback[];
  method: string;
  path: string;
  successMessage: string;
}

interface Payload {
  handleSubmit: (event: FormEvent) => void;
  isSaving: boolean;
}

function useSubmit(options: Options): Payload {
  const { body, callbacks, method, path, successMessage } = options;
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSaving(true);

    try {
      await api(path, { body, method });
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
