import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary';
import NavBar from '../NavBar/presenter';
import SignIn from '../SignIn';
import TopAlbums from '../TopAlbums';
import FeaturedSongs from '../FeaturedSongs';
import NewReleases from '../NewReleases';
import Admin from '../Admin';
import CreateAlbum from '../CreateAlbum';
import EditAlbum from '../EditAlbum';
import DeleteAlbum from '../DeleteAlbum';
import AuthRoute from '../AuthRoute';
import Sandbox from '../Sandbox';

const NestedRoutes = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="top-albums" element={<TopAlbums />} />
      <Route path="featured-songs" element={<FeaturedSongs />} />
      <Route path="new-releases" element={<NewReleases />} />
      <AuthRoute path="admin" element={<Admin />} />
      <AuthRoute path="admin/new" element={<CreateAlbum />} />
      <AuthRoute path="admin/edit/:id" element={<EditAlbum />} />
      <AuthRoute path="admin/delete/:id" element={<DeleteAlbum />} />
      <AuthRoute path="sandbox" element={<Sandbox />} />
      <Route path="signin" element={<SignIn />} />
      <Route>
        <Navigate to="top-albums" />
      </Route>
    </Routes>
  </ErrorBoundary>
);

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <NestedRoutes />
      </>
    </BrowserRouter>
  );
};

export default AppRoutes;
