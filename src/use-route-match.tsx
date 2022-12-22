import { useContext } from 'react';

import { RouteMatchContext } from './route.js';
import { type RouteMatch } from './use-route.js';

const useRouteMatch = (): RouteMatch | null => {
  return useContext(RouteMatchContext);
};

export { useRouteMatch };
