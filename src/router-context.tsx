import { createContext } from 'react';

import { type Router } from './router.js';

const RouterContext = createContext<Router | null>(null);

export { RouterContext };
