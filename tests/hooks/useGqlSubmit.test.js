import { renderHook } from '@testing-library/react-hooks';

import useGqlSubmit from '../../src/hooks/useGqlSubmit';
import { Provider } from '../../src/components/Provider';

const wrapper = ({ children }) => <Provider>{children}</Provider>;

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
  });
});
