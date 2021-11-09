import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useStore from '../../hooks/useStore';
import useSubmit from '../../hooks/useSubmit';
import useTitle from '../../hooks/useTitle';
import { SignInInput } from '../../utils/types';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import SignIn from './presenter';

export default function SignInContainer() {
  const navigate = useNavigate();
  const signIn = useStore((state) => state.signIn);
  useTitle('Sign In');
  const { handleSubmit, register } = useForm<SignInInput>();

  const options = {
    callbacks: [() => navigate('/admin')],
    handleSubmit,
    submitFn: async (data: SignInInput) => {
      const { error } = await signIn(data.email, data.password);

      if (error) throw error;
    },
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <ErrorBoundary>
      <ProgressLoader />
      <SignIn
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        register={register}
      />
    </ErrorBoundary>
  );
}
