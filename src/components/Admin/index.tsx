import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PER_PAGE } from '../../constants';
import useTitle from '../../hooks/useTitle';
import ErrorBoundary from '../ErrorBoundary';
import Admin from './presenter';

export default function AdminContainer() {
  const navigate = useNavigate();
  const { search } = useLocation();
  useTitle('Admin');

  useEffect(() => {
    if (!search) {
      navigate(
        `/admin?page=1&perPage=${PER_PAGE.SMALL}&artist=&title=&sort=&direction=&studio=`,
        { replace: true },
      );
    }
  }, [navigate, search]);

  return (
    <ErrorBoundary>
      <Admin />
    </ErrorBoundary>
  );
}
