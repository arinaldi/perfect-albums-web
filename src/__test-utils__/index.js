import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

import { Provider } from '../components/Provider';

const Providers = ({ children, route }) => (
  <Provider>
    <MemoryRouter initialEntries={[route]}>
      {children}
    </MemoryRouter>
  </Provider>
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
