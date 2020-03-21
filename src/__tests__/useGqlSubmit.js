import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import PropTypes from 'prop-types';

import useGqlSubmit from '../hooks/useGqlSubmit';
import { Provider } from '../components/Provider';

const wrapper = ({ children }) => <Provider>{children}</Provider>;
wrapper.propTypes = { children: PropTypes.object };

test('useGqlSubmit handles successful data posting', async () => {
  const options = {
    callback: jest.fn,
    submitFunc: jest.fn,
    successMessage: 'OK',
  };
  const { result } = renderHook(() => useGqlSubmit(options), { wrapper });
  const state = result.current;

  expect(state).toEqual({
    handleSubmit: state.handleSubmit,
    isSaving: false,
    isValidated: false,
  });
});
