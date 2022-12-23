import { createRouter } from './internal/create-router.js';
import { type Router } from './router.js';

const createPathRouter = (): Router => {
  return createRouter({ decodeUrl: (url) => url, window });
};

export { createPathRouter };
