import { cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NavBar from '../../src/components/NavBar/presenter';
import useStore from '../../src/hooks/useStore';
import render from '../utils';

jest.mock('../../src/hooks/useStore', () => jest.fn());
const mockedUseStore = useStore as unknown as jest.Mock;

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
  mockedUseStore
    .mockImplementationOnce(() => false)
    .mockImplementationOnce(() => jest.fn);

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
  mockedUseStore
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => jest.fn)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => jest.fn);

  const { getAllByText } = renderProviders();
  const adminLinks = getAllByText('Admin');
  const signOutLinks = getAllByText('Sign Out');

  expect(adminLinks[0]).toBeInTheDocument();
  expect(signOutLinks[0]).toBeInTheDocument();
});
