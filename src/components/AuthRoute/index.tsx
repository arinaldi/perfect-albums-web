import { FC, ReactNode } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import useStore from '../../hooks/useStore';

interface Props {
  children: ReactNode;
  path: string;
}

const AuthRoute: FC<Props> = ({ children, ...props }) => {
  const hasAuth = useStore((state) => state.hasAuth);
  const location = useLocation();

  return hasAuth ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to={{ pathname: '/top-albums', state: { from: location } }} />
  );
};

export default AuthRoute;
