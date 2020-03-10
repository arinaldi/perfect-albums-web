import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppMessage from '../AppMessage/presenter';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: '',
  };

  static getDerivedStateFromError (error) {
    return {
      hasError: true,
      error: error.message,
    };
  }

  render () {
    const { hasError, error } = this.state;

    if (hasError) {
      return <AppMessage message={error} />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
