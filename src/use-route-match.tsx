import { useContext } from 'react';

import { RouteMatchContext } from './route-match-context.js';
import { type RouteMatch } from './types/route-match.js';

const useRouteMatch = (): RouteMatch | null => {
  return useContext(RouteMatchContext);
};

export { useRouteMatch };
