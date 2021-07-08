import { FormEvent, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import api from '../utils/api';
import { AlbumBase } from '../utils/types';
import { MESSAGES } from '../constants';
import { useAppDispatch } from '../components/Provider';

type Callback = () => void;

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

function useSubmit (options: Options): Payload {
  const {
    body,
    callbacks,
    method,
    path,
    successMessage,
  } = options;
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await api(path, { body, dispatch, method });
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
      if (err.message !== MESSAGES.UNAUTHORIZED) {
        toast({
          description: err.message || MESSAGES.ERROR,
          duration: 4000,
          isClosable: true,
          status: 'error',
          title: 'Error',
        });
      }
    }
  };

  return {
    handleSubmit,
    isSaving,
  };
}

export default useSubmit;
