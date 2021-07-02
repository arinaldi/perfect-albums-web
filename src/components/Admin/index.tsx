import { FC } from 'react';

import ErrorBoundary from '../ErrorBoundary';
import Admin from './presenter';

const AdminContainer: FC = () => (
  <ErrorBoundary>
    <Admin />
  </ErrorBoundary>
);

export default AdminContainer;
