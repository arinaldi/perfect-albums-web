import { renderHook } from '@testing-library/react-hooks';
import PropTypes from 'prop-types';

import mockApi from '../../src/utils/api';
import useSubmit from '../../src/hooks/useSubmit';
import { Provider } from '../../src/components/Provider';
import { mockAdminData } from '../mocks';

jest.mock('../../src/utils/api', () => jest.fn());

afterAll(() => {
  mockApi.mockClear();
});

const wrapper = ({ children }) => <Provider>{children}</Provider>;
wrapper.propTypes = { children: PropTypes.object };

test('useSubmit handles successful data posting', async () => {
  mockApi.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockAdminData[0]),
  }));
  const options = {
    body: mockAdminData[0],
    callbacks: [jest.fn],
    method: 'POST',
    path: '/api/albums',
    successMessage: 'OK',
  };
  const { result } = renderHook(() => useSubmit(options), { wrapper });
  const state = result.current;

  expect(state).toEqual({
    handleSubmit: state.handleSubmit,
    isSaving: false,
  });
});
