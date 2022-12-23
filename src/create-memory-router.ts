import { createLiteWindow } from './internal/create-lite-window.js';
import { createRouter } from './internal/create-router.js';
import { type Router } from './router.js';
import { type UrlLike } from './url-like.js';

const createMemoryRouter = (urlLike: UrlLike | string = '/', state: {} | null = null): Router => {
  return createRouter({
    decodeUrl: (url) => url,
    window: createLiteWindow(typeof urlLike === 'string' ? urlLike : urlLike.href, state),
  });
};

export { createMemoryRouter };
