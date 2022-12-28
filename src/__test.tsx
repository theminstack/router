import { type RenderResult, render } from '@testing-library/react';
import { type ComponentProps, type ComponentType, type ReactElement, type ReactNode } from 'react';
import { assert } from 'vitest';

import { MemoryRouter } from './memory-router.js';
import { type Router } from './types/router.js';
import { useRouter } from './use-router.js';

type RenderWithRouterResult = RenderResult & {
  router: Router;
};

const renderWithRouter = <TRouter extends ComponentType<{ children?: ReactNode }> = typeof MemoryRouter>(
  ui: ReactElement | null = null,
  RouterComponent: TRouter = MemoryRouter as TRouter,
  props = {} as Omit<ComponentProps<TRouter>, 'children'>,
): RenderWithRouterResult => {
  let router: Router;

  const Capture = () => {
    router = useRouter();
    return null;
  };

  const result = render(ui ?? <></>, {
    wrapper: ({ children }) => {
      return (
        <RouterComponent {...(props as any)}>
          <Capture />
          {children}
        </RouterComponent>
      );
    },
  });

  Object.defineProperties(result, {
    router: { configurable: true, enumerable: true, get: () => router },
  });

  assert((result as RenderWithRouterResult).router);

  return result as RenderWithRouterResult;
};

export { type RenderWithRouterResult, renderWithRouter };
