import { useMemo } from 'react';

import { createMatcher } from './internal/create-matcher.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { type RouteMatch } from './types/route-match.js';
import { useLocation } from './use-location.js';

const useRoute = (patterns: string | readonly string[] = []): RouteMatch | null => {
  const { state, path, search, hash } = useLocation();
  const stablePatterns = useJsonMemo(patterns);
  const matchers = useMemo(() => {
    return (Array.isArray(stablePatterns) ? stablePatterns : [stablePatterns]).map((pattern) => createMatcher(pattern));
  }, [stablePatterns]);
  const routeMatch = useMemo<RouteMatch | null>(() => {
    for (const matcher of matchers) {
      const [match] = matcher(path);

      if (match) {
        return { ...match, hash, search, state };
      }
    }

    return null;
  }, [matchers, state, path, search, hash]);

  return routeMatch;
};

export { useRoute };
