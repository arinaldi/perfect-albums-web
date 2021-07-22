import { FC, FormEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../utils/api';
import useAuth from '../../hooks/useAuth';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import SignIn from './presenter';

const SignInContainer: FC = () => {
  const { hasAuth, signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { username, password } = event.target as HTMLFormElement;
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
    return <Redirect to="/admin" />;
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
