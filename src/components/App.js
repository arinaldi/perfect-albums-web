import React from 'react';

import '../styles.css';
import ErrorBoundary from './ErrorBoundary';
import { Provider } from './Provider';
import Routes from './Routes';

const App = () => (
  <ErrorBoundary>
    <Provider>
      <Routes />
    </Provider>
  </ErrorBoundary>
);

export default App;
