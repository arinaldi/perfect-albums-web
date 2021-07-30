import { FC, FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import useStore from '../../hooks/useStore';
import useTitle from '../../hooks/useTitle';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import SignIn from './presenter';

const SignInContainer: FC = () => {
  const hasAuth = useStore((state) => state.hasAuth);
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
    } catch (err) {
      setError(err.error_description || err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (hasAuth) {
    return <Navigate to="/new-releases" />;
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
