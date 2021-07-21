import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  route: string;
}

const Providers = ({ children, route }: Props) => (
  <ChakraProvider>
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  </ChakraProvider>
);

Providers.defaultProps = {
  route: '',
};

export default (component: ReactElement, route = '/'): RenderResult => ({
  ...render(<Providers route={route}>{component}</Providers>),
});
