import { ReactElement } from 'react';
import { useLocation, Navigate, Route } from 'react-router-dom';

import useStore from '../../hooks/useStore';

interface Props {
  element: ReactElement;
  path: string;
}

export default function AuthRoute({ ...props }: Props) {
  const user = useStore((state) => state.user);
  const location = useLocation();

  return user ? (
    <Route {...props} />
  ) : (
    <Navigate to="/top-albums" state={{ from: location }} />
  );
}
