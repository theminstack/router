import { createContext } from 'react';

import { type RouteMatch } from './types/route-match.js';

const RouteMatchContext = createContext<RouteMatch | null>(null);

export { RouteMatchContext };
