import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PER_PAGE } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import Admin from './presenter';

const AdminContainer: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (!search) {
      navigate(
        `/admin?direction=&page=1&perPage=${PER_PAGE.SMALL}&search=&sort=`,
        { replace: true },
      );
    }
  }, [navigate, search]);

  return (
    <ErrorBoundary>
      <Admin />
    </ErrorBoundary>
  );
};

export default AdminContainer;
