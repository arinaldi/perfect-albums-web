import { FC, useReducer } from 'react';

import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import Sandbox from './presenter';

const SandboxContainer: FC = () => {
  const [page, setPage] = useReducer((page) => page + 1, 1);

  return (
    <ErrorBoundary>
      <ProgressLoader />
      <Sandbox handleNext={setPage} page={page} />
    </ErrorBoundary>
  );
};

export default SandboxContainer;
