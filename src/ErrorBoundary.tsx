import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='error'>
          <div>(⊙.⊙(◉̃_᷅◉)⊙.⊙)</div>
          <div>Sorry, but something went wrong.</div>
          <div>We are already working on this issue.</div>
          <div>Try come back later or reload page.</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
