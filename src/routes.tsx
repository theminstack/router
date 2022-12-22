import { type ReactNode, Children, useMemo } from 'react';

import { createMatcher } from './internal/matcher.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { isRoute, RouteMatchContext } from './route.js';
import { useLocation } from './use-location.js';

type RoutesProps = {
  readonly children?: ReactNode;
};

const Routes = ({ children }: RoutesProps = {}): JSX.Element | null => {
  const { pathname, state, search, hash } = useLocation();
  const routes = Children.toArray(children).filter(isRoute);
  const paths = routes.flatMap<[path: string, index: number]>((child, i) => {
    return isRoute(child)
      ? Array.isArray(child.props.path)
        ? child.props.path.map((path): [string, number] => [path, i])
        : [[child.props.path ?? '/*', i]]
      : [];
  });
  const stablePaths = useJsonMemo(paths);
  const matchers = useMemo(() => stablePaths.map(([path, index]) => createMatcher(path, index)), [stablePaths]);
  const [routeMatch, routeIndex] = useMemo(() => {
    for (const matcher of matchers) {
      const [match, index] = matcher(pathname);

      if (match) {
        return [{ ...match, hash, search, state }, index];
      }
    }

    return [null, null];
  }, [matchers, state, pathname, search, hash]);

  return routeIndex != null ? (
    <RouteMatchContext.Provider value={routeMatch}>{routes[routeIndex]?.props.children}</RouteMatchContext.Provider>
  ) : null;
};

export { type RoutesProps, Routes };
