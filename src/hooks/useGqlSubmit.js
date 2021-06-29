import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { MESSAGES } from '../constants';

const useGqlSubmit = (options) => {
  const {
    callback,
    submitFunc,
    successMessage,
  } = options;
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await submitFunc();
      setIsSaving(false);

      callback();
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
  };

  return {
    handleSubmit,
    isSaving,
  };
};

export default useGqlSubmit;
