import { type RenderResult, render } from '@testing-library/react';
import { type ComponentType, type ReactElement, type ReactNode } from 'react';
import { assert } from 'vitest';

import { type Router } from './types/router.js';
import { useRouter } from './use-router.js';

type RouterRenderResult = RenderResult & {
  router: Router;
};

const renderWithRouter = <TProps extends { children?: ReactNode }>(
  RouterComponent: ComponentType<TProps>,
  ui: ReactElement = <></>,
  props = {} as Omit<TProps, 'children'>,
): RouterRenderResult => {
  let router: Router | undefined;

  const Capture = () => {
    router = useRouter();
    return null;
  };

  const result = render(ui, {
    wrapper: ({ children }) => {
      return (
        <RouterComponent {...(props as TProps)}>
          <Capture />
          {children}
        </RouterComponent>
      );
    },
  });

  assert(router);

  return { ...result, router };
};

export { renderWithRouter };
