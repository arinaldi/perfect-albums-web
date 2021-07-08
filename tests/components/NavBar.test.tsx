import { cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { DispatchContext, StateContext } from '../../src/components/Provider';
import NavBar from '../../src/components/NavBar/presenter';
import { User } from '../../src/reducers/provider';
import render from '../utils';

beforeAll(() => {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addListener: jest.fn,
      removeListener: jest.fn,
    };
  };
});
afterEach(cleanup);

const renderProviders = (user: User) => render(
  <StateContext.Provider value={{ user }}>
    <DispatchContext.Provider value={jest.fn()}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </DispatchContext.Provider>
  </StateContext.Provider>,
);

test('NavBar renders when not authenticated', () => {
  const user = { isAuthenticated: false };
  const { getAllByText, getByText } = renderProviders(user);
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
  const user = { isAuthenticated: true };
  const { getAllByText } = renderProviders(user);
  const adminLinks = getAllByText('Admin');
  const signOutLinks = getAllByText('Sign Out');

  expect(adminLinks[0]).toBeInTheDocument();
  expect(signOutLinks[0]).toBeInTheDocument();
});
