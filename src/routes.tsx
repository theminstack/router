import { type ReactElement, type ReactNode, Children, isValidElement, useMemo } from 'react';

import { createMatcher } from './internal/create-matcher.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { type RouteProps, Route } from './route.js';
import { RouteMatchContext } from './route-match-context.js';
import { useLocation } from './use-location.js';
import { useRouteMatch } from './use-route-match.js';

type RoutesProps = {
  readonly children?: ReactNode;
};

const isRoute = (child: unknown): child is ReactElement<RouteProps, typeof Route> => {
  return isValidElement(child) && child.type === Route;
};

const Routes = ({ children }: RoutesProps = {}): JSX.Element | null => {
  const { state, path, search, hash } = useLocation();
  const patternPrefix = useRouteMatch()?.patternPrefix ?? '/';
  const childArray = Children.toArray(children);
  const patterns = useJsonMemo(
    childArray.map((child) => {
      return isRoute(child)
        ? (Array.isArray(child.props.path) ? child.props.path : [child.props.path ?? '*']).map(
            (routePath): `/${string}` =>
              routePath.startsWith('/') ? (routePath as `/${string}`) : `${patternPrefix}${routePath}`,
          )
        : null;
    }),
  );
  const matchers = useMemo(() => {
    return patterns.map((pattern) => pattern && createMatcher(pattern));
  }, [patterns]);
  const [match, index] = useMemo(() => {
    for (let i = 0; i < matchers.length; ++i) {
      const matcher = matchers[i];

      if (!matcher) {
        continue;
      }

      const match0 = matcher(path);

      if (match0) {
        return [match0, i];
      }
    }

    return [null, -1];
  }, [matchers, path]);
  const routeMatch = useMemo(() => {
    return match && { ...match, hash, search, state };
  }, [match, hash, state, search]);

  return (
    <>
      {childArray.flatMap((child, i) => {
        return index !== i || !isValidElement(child) ? (
          child
        ) : (
          <RouteMatchContext.Provider key={child.key} value={routeMatch}>
            {child.props.children}
          </RouteMatchContext.Provider>
        );
      })}
    </>
  );
};

export { type RoutesProps, Routes };
