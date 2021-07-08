import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

import { Provider } from '../src/components/Provider';

interface Props {
  children: ReactNode;
  route: string;
}

const Providers = ({ children, route }: Props) => (
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

export default (component: ReactElement, route = '/'): RenderResult => ({
  ...render(
    <Providers route={route}>
      {component}
    </Providers>,
  ),
});
