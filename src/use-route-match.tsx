import { useContext } from 'react';

import { type RouteMatch } from './route-match.js';
import { RouteMatchContext } from './route-match-context.js';

const useRouteMatch = (): RouteMatch | null => {
  return useContext(RouteMatchContext);
};

export { useRouteMatch };
