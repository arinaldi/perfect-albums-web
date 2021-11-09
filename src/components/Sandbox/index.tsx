import { useReducer } from 'react';

import useTitle from '../../hooks/useTitle';
import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import Sandbox from './presenter';

export default function SandboxContainer() {
  const [page, setPage] = useReducer((page) => page + 1, 1);
  useTitle('Sandbox');

  return (
    <ErrorBoundary>
      <ProgressLoader />
      <Sandbox handleNext={setPage} page={page} />
    </ErrorBoundary>
  );
}
