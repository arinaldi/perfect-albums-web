import { fireEvent, waitFor } from '@testing-library/react';

import AdminContainer from '../../src/components/Admin';
import render from '../utils';
import { mockAdminData } from '../mocks';
import useAdminAlbums from '../../src/hooks/useAdminAlbums';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    data: mockAdminData,
    count: mockAdminData.length,
  }),
}));

jest.mock('../../src/hooks/useAdminAlbums', () => (
  jest.fn().mockImplementation(() => {
    return {
      albums: mockAdminData,
      total: mockAdminData.length,
      hasError: false,
      isLoading: false,
    };
  })
));

afterAll(() => {
  useAdminAlbums.mockClear();
});

describe('Admin container', () => {
  test('filters data by search', async () => {
    const value = 'nirvana';
    const { getByPlaceholderText, getByTestId, getByText } = render(<AdminContainer />);
    const searchInput = getByPlaceholderText(/search/i);
    const total = getByTestId('total');
    const clearButton = getByText('Clear');

    expect(total.textContent).toEqual(mockAdminData.length.toString());

    fireEvent.change(searchInput, { target: { value } });

    await waitFor(() => {
      expect(searchInput.value).toEqual(value);
    });

    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(searchInput.value).toEqual('');
    });
  });
});
