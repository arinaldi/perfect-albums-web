import { ChakraProvider } from '@chakra-ui/react';

import { SWRProvider } from '../hooks/useStore';
import theme from '../utils/theme';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';

export default function App() {
  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <SWRProvider>
          <Routes />
        </SWRProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
