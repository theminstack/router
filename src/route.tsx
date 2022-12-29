import { type ReactNode } from 'react';

import { RouteMatchContext } from './route-match-context.js';
import { useRoute } from './use-route.js';

type RouteProps = {
  readonly children?: ReactNode;
  readonly path?: string[] | string;
};

const Route = ({ path = '/*', children }: RouteProps = {}): JSX.Element | null => {
  const match = useRoute(path);

  return match ? <RouteMatchContext.Provider value={match}>{children}</RouteMatchContext.Provider> : null;
};

export { type RouteProps, Route };
