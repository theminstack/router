import { createContext, useContext, useEffect, useState } from 'react';

import { type Location } from './location.js';
import { type RouteMatch } from './match.js';
import { type Router, createBrowserRouter, createRouter } from './router.js';

const RouterContext = createContext(typeof window === 'undefined' ? createRouter() : createBrowserRouter());

const useRouter = (): Router => {
  return useContext(RouterContext);
};

const useLocation = (): Location => {
  const router = useRouter();
  const [location, setLocation] = useState(router.location);

  useEffect(() => {
    setLocation(router.location);
    return router.onChange(setLocation);
  }, [router]);

  return location;
};

const RouteMatchContext = createContext<RouteMatch>({ params: {}, pathname: '/' });

const useRouteMatch = (): RouteMatch => {
  return useContext(RouteMatchContext);
};

export { RouteMatchContext, RouterContext, useLocation, useRouteMatch, useRouter };
