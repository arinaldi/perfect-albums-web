import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
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

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string,
};

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
