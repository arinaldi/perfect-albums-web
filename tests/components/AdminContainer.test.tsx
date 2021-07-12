import { fireEvent, waitFor } from '@testing-library/react';

import AdminContainer from '../../src/components/Admin';
import render from '../utils';
import { mockAdminData } from '../mocks';
import useAdminAlbums from '../../src/hooks/useAdminAlbums';

const mockAdminAlbums = useAdminAlbums as jest.Mock;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: mockAdminData,
        count: mockAdminData.length,
      }),
  }),
) as jest.Mock;

jest.mock('../../src/hooks/useAdminAlbums', () =>
  jest.fn().mockImplementation(() => {
    return {
      albums: mockAdminData,
      total: mockAdminData.length,
      hasError: false,
      isLoading: false,
    };
  }),
);

afterAll(() => {
  mockAdminAlbums.mockClear();
});

describe('Admin container', () => {
  test('filters data by search', async () => {
    const value = 'nirvana';
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <AdminContainer />,
    );
    const searchInput = getByPlaceholderText(/search/i) as HTMLInputElement;
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
