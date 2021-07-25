import { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { PER_PAGE } from '../../constants';
import ErrorBoundary from '../ErrorBoundary';
import Admin from './presenter';

const AdminContainer: FC = () => {
  const history = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    if (!search) {
      history.replace(
        `/admin?direction=&page=1&perPage=${PER_PAGE.SMALL}&search=&sort=`,
      );
    }
  }, [history, search]);

  return (
    <ErrorBoundary>
      <Admin />
    </ErrorBoundary>
  );
};

export default AdminContainer;
