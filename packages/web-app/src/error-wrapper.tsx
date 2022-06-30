import React, { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface IErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<IErrorFallbackProps> = ({ error }) => <div>{JSON.stringify(error)}</div>;

const ErrorWrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;

export default ErrorWrapper;
