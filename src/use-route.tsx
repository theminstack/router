import { useMemo } from 'react';

import { createMatcher } from './internal/create-matcher.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { type RouteMatch } from './types/route-match.js';
import { useLocation } from './use-location.js';
import { useRouteMatch } from './use-route-match.js';

const useRoute = (pathPattern: string[] | string = []): RouteMatch | null => {
  const { state, path, search, hash } = useLocation();
  const patternPrefix = useRouteMatch()?.patternPrefix ?? '/';
  const patterns = useJsonMemo(
    (Array.isArray(pathPattern) ? pathPattern : [pathPattern ?? '*']).map((pattern): `/${string}` => {
      return pattern.startsWith('/') ? (pattern as `/${string}`) : `${patternPrefix}${pattern}`;
    }),
  );
  const matcher = useMemo(() => createMatcher(patterns), [patterns]);
  const match = useMemo(() => matcher(path), [matcher, path]);
  const routeMatch = useMemo<RouteMatch | null>(
    () => match && { ...match, hash, search, state },
    [match, state, search, hash],
  );

  return routeMatch;
};

export { useRoute };
