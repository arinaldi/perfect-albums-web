import { act, renderHook } from '@testing-library/react-hooks';

import useDebounce from '../hooks/useDebounce';

test('useDebounce handles value input', async () => {
  const value = 'test';
  const { result } = renderHook(() => useDebounce(value, 0));

  expect(result.current).toEqual(value);
});

test('useDebounce returns trimmed string', async () => {
  const value = 'test   ';
  const { result, waitForNextUpdate } = renderHook(() => useDebounce(value, 0));

  setImmediate(() => {
    act(() => {
      jest.useFakeTimers();
    });
  });

  await waitForNextUpdate();
  expect(result.current).toEqual(value.trim());
});
