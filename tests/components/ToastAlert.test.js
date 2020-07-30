import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { DispatchContext, StateContext } from '../../src/components/Provider';
import ToastAlert from '../../src/components/ToastAlert/presenter';
import { MESSAGES, TOAST_TYPES } from '../../src/constants';

afterEach(cleanup);

const renderProviders = (toast) => render(
  <StateContext.Provider value={{ toast }}>
    <DispatchContext.Provider value={jest.fn()}>
      <ToastAlert />
    </DispatchContext.Provider>
  </StateContext.Provider>,
);

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
