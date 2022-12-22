import { type LiteWindow, createLiteWindow } from './internal/window.js';

type RouterState = { readonly isPushed: boolean; readonly state: {} | null };
type RouterOptions = {
  readonly decodeUrl: (url: URL) => URL;
  readonly encodeUrl: (url: URL) => URL;
  readonly window: LiteWindow;
};
type UrlLike = string | { readonly href: string };
type RouterNavigation = {
  readonly replace?: boolean;
  readonly state?: {} | null;
  readonly to?: UrlLike | number;
};
type RouterHref = `${'http' | 'https'}://${string}`;
type RouterLocation = {
  readonly href: RouterHref;
  readonly pathname: string;
  readonly state: {} | null;
};
type Router = {
  readonly go: {
    (urlLike?: UrlLike): void;
    (delta?: number): void;
    (navigation?: RouterNavigation): void;
    (target?: RouterNavigation | UrlLike | number): void;
  };
  readonly isPushed: boolean;
  readonly location: RouterLocation;
  readonly subscribe: (subscriber: () => void) => () => void;
};

const isRouterState = (value: RouterState | {} | null): value is RouterState => {
  return (
    value != null &&
    typeof value === 'object' &&
    'state' in value &&
    'isPushed' in value &&
    typeof value.isPushed === 'boolean'
  );
};

const getNavigation = (target?: RouterNavigation | UrlLike | number): RouterNavigation => {
  return typeof target === 'object' && target != null && !('href' in target)
    ? {
        ...(target.replace == null ? {} : { replace: target.replace }),
        ...(target.state == null ? {} : { state: target.state }),
        ...(target.to == null ? {} : { to: target.to }),
      }
    : target == null
    ? {}
    : { to: target };
};

const createRouter = ({ window, encodeUrl, decodeUrl }: RouterOptions): Router => {
  let current: RouterLocation;

  const subscribers = new Set<() => void>();

  const update = () => {
    const url = decodeUrl(new URL(window.location.href));
    const state = isRouterState(window.history.state) ? window.history.state.state : null;

    current = {
      href: url.href as RouterHref,
      pathname: url.pathname,
      state,
    };

    subscribers.forEach((subscriber) => subscriber());
  };

  const self: Router = {
    go: async (deltaUrlOrNavigation = 0) => {
      const { replace = false, state = null, to = window.location.href } = getNavigation(deltaUrlOrNavigation);

      if (typeof to === 'number') {
        window.history.go(to);
      } else {
        const url = encodeUrl(new URL(typeof to === 'string' ? to : to.href, window.location.href));

        if (url.href === window.location.href && JSON.stringify(state) === JSON.stringify(window.history.state)) {
          return;
        }

        const newState: RouterState = {
          isPushed: replace ? (isRouterState(window.history.state) ? window.history.state.isPushed : false) : true,
          state,
        };

        try {
          window.history[replace ? 'replaceState' : 'pushState'](newState, '', url);
          update();
        } catch (_error) {
          // An error may be thrown when...
          // - URLs have an origin that doesn't match the current page.
          // - Browser specific (eg. iOS Safari) state change limits are exceeded.
          // - States are too large or not serializable.
          console.warn(`History state change failed. Falling back to location change (state will be lost).`);
          window.location[replace ? 'replace' : 'assign'](url);
        }
      }
    },
    get isPushed() {
      return isRouterState(window.history.state) ? window.history.state.isPushed : false;
    },
    get location() {
      return current;
    },
    subscribe: (handler) => {
      handler = handler.bind(null);
      subscribers.add(handler);
      window.addEventListener('popstate', update, { capture: true });

      return () => {
        subscribers.delete(handler);

        if (subscribers.size === 0) {
          window.removeEventListener('popstate', update, { capture: true });
        }
      };
    },
  };

  update();

  return self;
};

const createPathRouter = (): Router => {
  return createRouter({ decodeUrl: (url) => url, encodeUrl: (url) => url, window });
};

const createHashRouter = (): Router => {
  return createRouter({
    decodeUrl: (url) => new URL(url.hash.slice(1), window.location.href),
    encodeUrl: (url) => new URL(`#${url.pathname}${url.search}${url.hash}`, window.location.href),
    window,
  });
};

const createMemoryRouter = (urlLike: UrlLike = '/', state: {} | null = null): Router => {
  return createRouter({
    decodeUrl: (url) => url,
    encodeUrl: (url) => url,
    window: createLiteWindow(typeof urlLike === 'string' ? urlLike : urlLike.href, state),
  });
};

export {
  type Router,
  type RouterHref,
  type RouterLocation,
  type RouterNavigation,
  type UrlLike,
  createHashRouter,
  createMemoryRouter,
  createPathRouter,
  getNavigation,
};
