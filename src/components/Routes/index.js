import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary';
import NavBar from '../NavBar/presenter';
import ModalContainer from '../ModalContainer';
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

const AppRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route path="/top-albums"><TopAlbums /></Route>
      <Route path="/featured-songs"><FeaturedSongs /></Route>
      <Route path="/new-releases"><NewReleases /></Route>
      <AuthRoute path="/admin/new"><CreateAlbum /></AuthRoute>
      <AuthRoute path="/admin/edit/:id"><EditAlbum /></AuthRoute>
      <AuthRoute path="/admin/delete/:id"><DeleteAlbum /></AuthRoute>
      <AuthRoute path="/admin"><Admin /></AuthRoute>
      <AuthRoute path="/sandbox"><Sandbox /></AuthRoute>
      <Route path="/signin"><SignIn /></Route>
      <Route><Redirect to="/top-albums" /></Route>
    </Switch>
  </ErrorBoundary>
);

const Routes = () => {
  return (
    <Router>
      <>
        <NavBar />
        <ModalContainer />
        <AppRoutes />
      </>
    </Router>
  );
};

export default Routes;
