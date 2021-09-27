import { FC, FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { MESSAGES } from '../../constants/index';
import useStore from '../../hooks/useStore';
import useTitle from '../../hooks/useTitle';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import SignIn from './presenter';

const SignInContainer: FC = () => {
  const user = useStore((state) => state.user);
  const signIn = useStore((state) => state.signIn);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  useTitle('Sign In');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;
    const [email, password] = Array.from(elements) as HTMLInputElement[];

    try {
      setIsSubmitting(true);
      const { error } = await signIn(email.value, password.value);

      if (error) throw error;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : MESSAGES.ERROR_GENERIC;
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (user) {
    return <Navigate to="/admin" />;
  }

  return (
    <ErrorBoundary>
      <ProgressLoader />
      <SignIn
        error={error}
        isSubmitting={isSubmitting}
        onError={setError}
        onSubmit={handleSubmit}
      />
    </ErrorBoundary>
  );
};

export default SignInContainer;
