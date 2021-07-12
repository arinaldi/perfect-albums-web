import { Component, ReactNode } from 'react';

import AppMessage from '../AppMessage/presenter';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<Props, State> {
  state = {
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

export default ErrorBoundary;
