import { renderHook } from '@testing-library/react-hooks';

import useGqlSubmit from '../../src/hooks/useGqlSubmit';

test('useGqlSubmit handles successful data posting', async () => {
  const options = {
    callback: jest.fn,
    submitFunc: jest.fn(() => Promise.resolve(undefined)),
    successMessage: 'OK',
  };
  const { result } = renderHook(() => useGqlSubmit(options));
  const state = result.current;

  expect(state).toEqual({
    handleSubmit: state.handleSubmit,
    isSaving: false,
  });
});
