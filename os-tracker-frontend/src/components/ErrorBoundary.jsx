import { Component } from 'react';

/**
 * ErrorBoundary catches unhandled JavaScript errors anywhere in its child
 * component tree, logs them, and renders a graceful fallback UI instead
 * of the white screen of death.
 *
 * Usage: Wrap <App /> or any subtree in <ErrorBoundary>.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚠️</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-primary, #e05d44)' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--text-muted, #888)', marginBottom: '1.5rem', maxWidth: '400px' }}>
            An unexpected error occurred. Please refresh the page or go back to the home page.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--accent-primary, #e05d44)',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
