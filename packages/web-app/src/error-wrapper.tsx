import React, { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface IErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<IErrorFallbackProps> = ({ error }) => (
  <div>
    <div>Oh no something went wrong!</div>
    <div>{JSON.stringify(error)}</div>
  </div>
);

const ErrorWrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;

export default ErrorWrapper;
