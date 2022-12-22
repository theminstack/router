import { type ReactElement, type ReactNode, createContext, isValidElement } from 'react';

import { type RouteMatch, useRoute } from './use-route.js';

type RouteProps = {
  readonly children?: ReactNode;
  readonly path?: string[] | string;
};

const RouteMatchContext = createContext<RouteMatch | null>(null);

const Route = ({ path = '/*', children }: RouteProps = {}): JSX.Element | null => {
  const match = useRoute(path);

  return match ? <RouteMatchContext.Provider value={match}>{children}</RouteMatchContext.Provider> : null;
};

const isRoute = (child: unknown): child is ReactElement<RouteProps, typeof Route> => {
  return isValidElement(child) && child.type === Route;
};

export { type RouteProps, isRoute, Route, RouteMatchContext };
