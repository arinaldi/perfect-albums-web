import { FC, FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import api from '../../utils/api';
import useStore from '../../hooks/useStore';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import SignIn from './presenter';

const SignInContainer: FC = () => {
  const hasAuth = useStore((state) => state.hasAuth);
  const signIn = useStore((state) => state.signIn);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;
    const [username, password] = Array.from(elements) as HTMLInputElement[];
    setIsSubmitting(true);

    try {
      const { data } = await api('/api/signin', {
        body: {
          username: username.value,
          password: password.value,
        },
      });

      setIsSubmitting(false);
      signIn(data.token);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message);
    }
  };

  if (hasAuth) {
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
