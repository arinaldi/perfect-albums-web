import { Component, ReactNode } from 'react';

import AppMessage from '../AppMessage/presenter';

interface State {
  hasError: boolean;
  error: string;
}

export default class ErrorBoundary extends Component {
  state: State = {
    hasError: false,
    error: '',
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error.message,
    };
  }

  render(): ReactNode {
    const { hasError, error } = this.state;

    if (hasError) {
      return <AppMessage message={error} />;
    }

    return this.props.children;
  }
}
