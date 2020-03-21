import { useState } from 'react';

import {
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from '../constants';
import { useAppDispatch } from '../components/Provider';

const useGqlSubmit = (options) => {
  const {
    callback,
    submitFunc,
    successMessage,
  } = options;
  const dispatch = useAppDispatch();
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        submitFunc();
        setIsSaving(false);

        callback();
        dispatch({
          payload: {
            message: successMessage,
            type: TOAST_TYPES.SUCCESS,
          },
          type: DISPATCH_TYPES.OPEN_TOAST,
        });
      } catch (err) {
        setIsSaving(false);
        dispatch({
          payload: {
            message: err.message || MESSAGES.ERROR,
            type: TOAST_TYPES.ERROR,
          },
          type: DISPATCH_TYPES.OPEN_TOAST,
        });
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

export default useGqlSubmit;
