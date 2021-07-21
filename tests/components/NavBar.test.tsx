import { cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NavBar from '../../src/components/NavBar/presenter';
import useAuth from '../../src/hooks/useAuth';
import render from '../utils';

jest.mock('../../src/hooks/useAuth', () => jest.fn());
const mockedUseAuth = useAuth as unknown as jest.Mock;

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: jest.fn,
        removeListener: jest.fn,
      };
    };
});
afterEach(cleanup);

const renderProviders = () =>
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>,
  );

test('NavBar renders when not authenticated', () => {
  mockedUseAuth.mockImplementation(() => ({
    hasAuth: false,
  }));

  const { getAllByText, getByText } = renderProviders();
  const appHeader = getByText('Perfect Albums');
  const albumsLinks = getAllByText('Top Albums');
  const featuredLinks = getAllByText('Featured Songs');
  const releasesLinks = getAllByText('New Releases');
  const signinLinks = getAllByText('Sign In');

  expect(appHeader).toBeInTheDocument();
  expect(albumsLinks[0]).toBeInTheDocument();
  expect(featuredLinks[0]).toBeInTheDocument();
  expect(releasesLinks[0]).toBeInTheDocument();
  expect(signinLinks[0]).toBeInTheDocument();
});

test('NavBar renders when authenticated', () => {
  mockedUseAuth.mockImplementation(() => ({
    hasAuth: true,
  }));

  const { getAllByText } = renderProviders();
  const adminLinks = getAllByText('Admin');
  const signOutLinks = getAllByText('Sign Out');

  expect(adminLinks[0]).toBeInTheDocument();
  expect(signOutLinks[0]).toBeInTheDocument();
});
