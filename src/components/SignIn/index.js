import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { DISPATCH_TYPES } from '../../constants';
import api from '../../utils/api';
import { useApp } from '../Provider';
import ErrorBoundary from '../ErrorBoundary';
import AppMessage from '../AppMessage/presenter';
import SignIn from './presenter';

const SignInContainer = () => {
  const [state, dispatch] = useApp();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (error) setError('');

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    return <Redirect to='/admin' />;
  }

  return (
    <ErrorBoundary>
      <SignIn
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
        password={credentials.password}
        username={credentials.username}
      />
      {error && <AppMessage message={error} />}
    </ErrorBoundary>
  );
};

export default SignInContainer;
