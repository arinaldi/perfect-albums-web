import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import api from '../utils/api';
import { MESSAGES } from '../constants';
import { useAppDispatch } from '../components/Provider';

const useSubmit = (options) => {
  const {
    body,
    callbacks,
    method,
    path,
    successMessage,
  } = options;
  const dispatch = useAppDispatch();
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        await api(path, { body, dispatch, method, toast });
        setIsSaving(false);

        callbacks.forEach(cb => {
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
        if (err.message !== MESSAGES.UNAUTHORIZED) {
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
    } else {
      setIsValidated(true);
    }
  };

  return {
    handleSubmit,
    isSaving,
    isValidated,
  };
};

export default useSubmit;
