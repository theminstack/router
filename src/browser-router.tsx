import { type ReactNode, useMemo } from 'react';

import { createRouter } from './internal/create-router.js';
import { RouterContext } from './router-context.js';

type BrowserRouterProps = {
  children?: ReactNode;
};

const BrowserRouter = ({ children }: BrowserRouterProps): JSX.Element => {
  const router = useMemo(() => createRouter({ decodeUrl: (url) => url, window }), []);

  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};

export { type BrowserRouterProps, BrowserRouter };
