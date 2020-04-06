import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { DispatchContext, StateContext } from '../../src/components/Provider';
import NavBar from '../../src/components/NavBar/presenter';

afterEach(cleanup);

const renderProviders = (user) => render(
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
  const { getByText } = renderProviders(user);
  const appHeader = getByText('Perfect Albums');
  const albumsLink = getByText('Top Albums');
  const songsLink = getByText('Perfect Songs');
  const featuredLink = getByText('Featured Songs');
  const releasesLink = getByText('New Releases');
  const signinLink = getByText('Sign In');

  expect(appHeader).toBeInTheDocument();
  expect(albumsLink).toBeInTheDocument();
  expect(songsLink).toBeInTheDocument();
  expect(featuredLink).toBeInTheDocument();
  expect(releasesLink).toBeInTheDocument();
  expect(signinLink).toBeInTheDocument();
});

test('NavBar renders when authenticated', () => {
  const user = { isAuthenticated: true };
  const { getByText } = renderProviders(user);
  const adminLink = getByText('Admin');
  const signOutLink = getByText('Sign Out');

  expect(adminLink).toBeInTheDocument();
  expect(signOutLink).toBeInTheDocument();
});
