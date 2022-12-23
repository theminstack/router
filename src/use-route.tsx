import { useMemo } from 'react';

import { createMatcher } from './internal/create-matcher.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { type RouteMatch } from './route-match.js';
import { useLocation } from './use-location.js';

const useRoute = (paths: string | readonly string[] = []): RouteMatch | null => {
  const { state, pathname, search, hash } = useLocation();
  const stablePaths = useJsonMemo(paths);
  const matchers = useMemo(() => {
    return (Array.isArray(stablePaths) ? stablePaths : [stablePaths]).map((path) => createMatcher(path));
  }, [stablePaths]);
  const routeMatch = useMemo<RouteMatch | null>(() => {
    for (const matcher of matchers) {
      const [match] = matcher(pathname);

      if (match) {
        return { ...match, hash, search, state };
      }
    }

    return null;
  }, [matchers, state, pathname, search, hash]);

  return routeMatch;
};

export { useRoute };
