import { useMemo } from 'react';

import { type Match, createMatcher } from './internal/matcher.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { useLocation } from './use-location.js';

type RouteMatch = Match & {
  state: {} | null;
};

const useRoute = (paths: string | readonly string[] = []): RouteMatch | null => {
  const location = useLocation();
  const stablePaths = useJsonMemo(paths);
  const matchers = useMemo(() => {
    return (Array.isArray(stablePaths) ? stablePaths : [stablePaths]).map((path) => createMatcher(path));
  }, [stablePaths]);
  const routeMatch = useMemo<RouteMatch | null>(() => {
    for (const matcher of matchers) {
      const [match] = matcher(location.pathname);

      if (match) {
        return { ...match, state: location.state };
      }
    }

    return null;
  }, [matchers, location]);

  return routeMatch;
};

export { type RouteMatch, useRoute };
