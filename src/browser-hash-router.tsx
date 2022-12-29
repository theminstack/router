import { type ReactNode, useMemo } from 'react';

import { createRouter } from './internal/create-router.js';
import { RouterContext } from './router-context.js';

type BrowserHashRouterProps = {
  children?: ReactNode;
};

const BrowserHashRouter = ({ children }: BrowserHashRouterProps): JSX.Element => {
  const router = useMemo(
    () => createRouter({ decodeUrl: (url) => new URL(url.hash.slice(1), 'http://localhost'), window }),
    [],
  );

  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};

export { type BrowserHashRouterProps, BrowserHashRouter };
