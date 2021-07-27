import { FC, ReactElement } from 'react';
import { useLocation, Navigate, Route } from 'react-router-dom';

import useStore from '../../hooks/useStore';

interface Props {
  element: ReactElement;
  path: string;
}

const AuthRoute: FC<Props> = ({ ...props }) => {
  const hasAuth = useStore((state) => state.hasAuth);
  const location = useLocation();

  return hasAuth ? (
    <Route {...props} />
  ) : (
    <Navigate to="/top-albums" state={{ from: location }} />
  );
};

export default AuthRoute;
