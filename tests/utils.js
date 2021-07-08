import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

import { Provider } from '../src/components/Provider';

const Providers = ({ children, route }) => (
  <ChakraProvider>
    <Provider>
      <MemoryRouter initialEntries={[route]}>
        {children}
      </MemoryRouter>
    </Provider>
  </ChakraProvider>
);

Providers.defaultProps = {
  route: '',
};

export default (component, route) => ({
  ...render(
    <Providers route={route}>
      {component}
    </Providers>,
  ),
});
