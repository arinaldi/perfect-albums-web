import { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../utils/theme';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';

const App: FC = () => (
  <ErrorBoundary>
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  </ErrorBoundary>
);

export default App;
