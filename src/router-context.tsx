import { createContext } from 'react';

import { type Router } from './types/router.js';

const RouterContext = createContext<Router | null>(null);

export { RouterContext };
