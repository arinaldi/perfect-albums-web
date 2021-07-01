import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAppState } from '../Provider';

const AuthRoute = ({ children, ...props }) => {
  const { user: { isAuthenticated } } = useAppState();
  const location = useLocation();

  return (
    isAuthenticated
      ? <Route {...props}>{children}</Route>
      : <Redirect to={{ pathname: '/top-albums', state: { from: location } }} />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
