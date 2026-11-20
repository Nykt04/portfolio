import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorPageView } from './ErrorPageView';

interface BoundaryProps {
  children: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
  message: string;
}

export class PortfolioErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): BoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Unexpected render fault',
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('Portfolio runtime error caught by ErrorBoundary:', error, info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPageView code="500" errorMessage={this.state.message} onReset={this.reset} />
      );
    }
    return this.props.children;
  }
}
