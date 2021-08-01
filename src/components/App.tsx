import { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { SWRProvider } from '../hooks/useStore';
import theme from '../utils/theme';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';

const App: FC = () => (
  <ErrorBoundary>
    <ChakraProvider theme={theme}>
      <SWRProvider>
        <Routes />
      </SWRProvider>
    </ChakraProvider>
  </ErrorBoundary>
);

export default App;
