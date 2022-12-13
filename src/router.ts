import { type Location, createLocation, getLocationPathUri } from './location.js';
import { warn } from './warn.js';

type Action = 'back' | 'pushState' | 'replaceState';

type PopOptions = {
  readonly count?: number;
  readonly force?: boolean;
};

type PushOptions = Partial<Location> & {
  readonly force?: boolean;
  readonly replace?: boolean;
};

type Router = {
  readonly length: number;
  readonly location: Location;
  readonly onBeforeChange: (
    subscriber: (
      location: Location,
      action: Action,
    ) => Promise<boolean | undefined | void> | boolean | undefined | void,
  ) => () => void;
  readonly onChange: (subscriber: (location: Location, action: Action) => void) => () => void;
  readonly pop: (options?: PopOptions) => Promise<boolean>;
  readonly push: (options: PushOptions) => Promise<boolean>;
};

const createRouter = (locationOrUri?: Partial<Location> | string): Router => {
  let current = createLocation(locationOrUri);

  const history: Location[] = [];
  const onBeforeChange = new Set<
    (location: Location, action: Action) => Promise<boolean | undefined | void> | boolean | undefined | void
  >();
  const onChange = new Set<(location: Location, action: Action) => void>();

  const beforeNext = async (location: Location, action: Action): Promise<boolean> => {
    const results = await Promise.allSettled(Array.from(onBeforeChange).map((handler) => handler(location, action)));
    return results.every((result) => result.status === 'fulfilled' && result.value !== false);
  };

  const next = (location: Location, action: Action) => {
    onChange.forEach((handler) => handler(location, action));
  };

  const instance: Router = {
    get length() {
      return history.length;
    },
    get location() {
      return current;
    },
    onBeforeChange: (handler) => {
      handler = handler.bind(null);
      onBeforeChange.add(handler);
      return () => void onBeforeChange.delete(handler);
    },
    onChange: (handler) => {
      handler = handler.bind(null);
      onChange.add(handler);
      return () => void onChange.delete(handler);
    },
    pop: async ({ count = 1, force = false }: PopOptions = {}) => {
      for (let index = Math.abs(count); index > 0; index--) {
        if (history.length === 0 || (!(await beforeNext(history.at(-1) as Location, 'back')) && !force)) {
          return false;
        }

        current = history.pop() as Location;
        next(current, 'back');
      }

      return true;
    },
    push: async ({ replace = false, force = false, ...update }) => {
      const location = createLocation(update, current);
      const action = replace ? 'replaceState' : 'pushState';

      if (!(await beforeNext(location, action)) && !force) {
        return false;
      }

      if (!replace) {
        history.push(current);
      }

      current = location;
      next(current, action);
      return true;
    },
  };

  return instance;
};

type State = {
  readonly $isMinStackRouter: boolean;
  readonly data: any;
};

const isState = (value: unknown): value is State => {
  return value != null && typeof value === 'object' && '$isMinStackRouter' in value;
};

const createBrowserRouter = (getUri: (location: Location) => string = getLocationPathUri): Router => {
  const router = createRouter(window.location);

  router.onBeforeChange(async (_location, action) => {
    if (action === 'back' && !isState(window.history.state)) {
      warn('Refusing to pop a history entry that was not pushed by the MinStack Router');
      return false;
    }

    return true;
  });

  router.onChange((location, action) => {
    if (action === 'back') {
      window.history.back();
    } else {
      window.history[action]({ $isMinStackRouter: true, data: location.data }, '', getUri(location));
    }
  });

  return router;
};

export { type Router, createBrowserRouter, createRouter };
