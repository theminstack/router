import { createContext } from 'react';

import { createMemoryRouter } from './create-memory-router.js';
import { createPathRouter } from './create-path-router.js';

const RouterContext = createContext(typeof window === 'undefined' ? createMemoryRouter() : createPathRouter());

export { RouterContext };
