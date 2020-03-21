import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import '../styles.css';
import { getToken } from '../utils/storage';
import { BASE_URL } from '../constants';
import ErrorBoundary from './ErrorBoundary';
import { Provider } from './Provider';
import Routes from './Routes';

const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  request: (operation) => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

const App = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <Provider>
        <Routes />
      </Provider>
    </ApolloProvider>
  </ErrorBoundary>
);

export default App;
