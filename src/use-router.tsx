import { createContext, useContext } from 'react';

import { createMemoryRouter, createPathRouter } from './router.js';

const RouterContext = createContext(typeof window === 'undefined' ? createMemoryRouter() : createPathRouter());

const useRouter = () => useContext(RouterContext);

export { RouterContext, useRouter };
