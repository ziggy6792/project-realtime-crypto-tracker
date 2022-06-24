// https://github.com/TanStack/query/issues/3476#issuecomment-1092424508
import React, { ReactNode } from 'react';

declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    children?: ReactNode;
  }
}
