import React, { useReducer } from 'react';

import Sandbox from './presenter';

const SandboxContainer = () => {
  const [page, setPage] = useReducer((page) => page + 1, 1);

  return <Sandbox handleNext={setPage} page={page} />;
};

export default SandboxContainer;
