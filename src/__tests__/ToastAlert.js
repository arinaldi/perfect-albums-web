import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { DispatchContext, StateContext } from '../components/Provider';
import ToastAlert from '../components/ToastAlert/presenter';

import { MESSAGES, TOAST_TYPES } from '../constants';

afterEach(cleanup);

const renderProviders = (toast) => render(
  <StateContext.Provider value={{ toast }}>
    <DispatchContext.Provider value={jest.fn()}>
      <ToastAlert />
    </DispatchContext.Provider>
  </StateContext.Provider>
);

test('ToastAlert renders as hidden', () => {
  const toast = {
    isOpen: false,
  };
  const { container } = renderProviders(toast);
  const div = container.querySelector('.toast-body');

  expect(div.textContent).toBe('');
});

test('ToastAlert renders as visible', () => {
  const message = `${MESSAGES.ALBUM_PREFIX} edited`;
  const toast = {
    isOpen: true,
    message,
    type: TOAST_TYPES.SUCCESS,
  };
  const { container, getByText } = renderProviders(toast);

  const div = container.querySelector('.toast');
  const text = getByText(message);

  expect(div).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
