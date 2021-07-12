import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { DISPATCH_TYPES } from '../../constants';
import api from '../../utils/api';
import { useApp } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import SignIn from './presenter';

const SignInContainer: FC = () => {
  const [state, dispatch] = useApp();
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
      dispatch({
        payload: data.token,
        type: DISPATCH_TYPES.SIGN_IN_USER,
      });
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message);
    }
  };

  if (state.user.isAuthenticated) {
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
