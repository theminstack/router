import { type ReactNode, useMemo } from 'react';

import { createLiteWindow } from './internal/create-lite-window.js';
import { createRouter } from './internal/create-router.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { RouterContext } from './router-context.js';

type MemoryRouterProps = {
  readonly children?: ReactNode;
  readonly initialState?: {} | null;
  readonly initialUrl?: string;
};

const MemoryRouter = ({ children, ...props }: MemoryRouterProps): JSX.Element => {
  const { initialUrl = '/', initialState = null } = useJsonMemo(props);
  const router = useMemo(
    () =>
      createRouter({
        decodeUrl: (url) => url,
        window: createLiteWindow(initialUrl, initialState),
      }),
    [initialUrl, initialState],
  );

  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};

export { type MemoryRouterProps, MemoryRouter };
