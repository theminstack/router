import { createRouter } from './internal/create-router.js';
import { type Router } from './router.js';

const createHashRouter = (): Router => {
  return createRouter({ decodeUrl: (url) => new URL(url.hash.slice(1), 'http://localhost'), window });
};

export { createHashRouter };
