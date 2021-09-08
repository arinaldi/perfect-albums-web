import { FC, ReactElement } from 'react';
import { useLocation, Navigate, Route } from 'react-router-dom';

import useStore from '../../hooks/useStore';

interface Props {
  element: ReactElement;
  path: string;
}

const AuthRoute: FC<Props> = ({ ...props }) => {
  const user = useStore((state) => state.user);
  const location = useLocation();

  return user ? (
    <Route {...props} />
  ) : (
    <Navigate to="/top-albums" state={{ from: location }} />
  );
};

export default AuthRoute;
