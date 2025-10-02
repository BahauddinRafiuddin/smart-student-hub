class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Oops! Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
