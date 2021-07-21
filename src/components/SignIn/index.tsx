import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../utils/api';
import useAuth from '../../hooks/useAuth';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import SignIn from './presenter';

const SignInContainer: FC = () => {
  const { hasAuth, signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (error) setError('');

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await api('/api/signin', { body: credentials });

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
        onChange={handleChange}
        onSubmit={handleSubmit}
        password={credentials.password}
        username={credentials.username}
      />
    </ErrorBoundary>
  );
};

export default SignInContainer;
