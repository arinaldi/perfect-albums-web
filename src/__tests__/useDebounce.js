import { renderHook } from '@testing-library/react-hooks';

import useDebounce from '../hooks/useDebounce';

test('useDebounce handles value input', () => {
  const value = 'test';
  const { result } = renderHook(() => useDebounce(value));

  expect(result.current).toEqual(value);
});
