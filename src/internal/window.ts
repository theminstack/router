type LiteWindow = {
  readonly addEventListener: (event: 'popstate', listener: () => void, options?: { capture?: boolean }) => void;
  readonly history: {
    readonly go: (delta: number) => void;
    readonly length: number;
    readonly pushState: (state: {} | null, unused: '', url: URL) => void;
    readonly replaceState: (state: {} | null, unused: '', url: URL) => void;
    readonly state: {} | null;
  };
  readonly location: { readonly assign: (url: URL) => void; readonly href: string; replace: (url: URL) => void };
  readonly removeEventListener: (event: 'popstate', listener: () => void, options?: { capture?: boolean }) => void;
};

type Listener = { readonly callback: () => void; readonly capture: boolean };
type Entry = { readonly data: {} | null; readonly href: string };

const isListenerMatch = (a: Listener, b: Listener): boolean => {
  return a.capture === b.capture && a.callback === b.callback;
};

const createLiteWindow = (initialLocation = '', state: {} | null): LiteWindow => {
  let listeners: readonly Listener[] = [];
  let index = 1;
  let current: Entry = {
    data: state,
    href: new URL(initialLocation, 'http://localhost').href,
  };

  const stack: [Entry, ...Entry[]] = [current];
  const createEntry = (url: URL, data: {} | null = null) => ({ data, href: url.href });

  const self: LiteWindow = {
    addEventListener: (event, callback, options = {}) => {
      const newListener = { callback, capture: options.capture ?? false, event };

      if (event === 'popstate' && !listeners.some((listener) => isListenerMatch(listener, newListener))) {
        listeners = [...listeners, newListener];
      }
    },
    history: {
      go: (delta = 0) => {
        index = Math.max(0, Math.min(stack.length - 1, index + delta));
        current = stack[index] as Entry;
        void Promise.resolve().then(() => listeners.forEach((listener) => listener.callback()));
      },
      get length() {
        return stack.length;
      },
      pushState: (data = null, _unused, url) => {
        stack.splice(index++, 1, createEntry(url, data));
      },
      replaceState: (data, _unused, url) => {
        stack[index] = createEntry(url, data);
      },
      get state() {
        return current.data;
      },
    },
    location: {
      assign: (url) => {
        self.history.pushState(null, '', url);
      },
      get href() {
        return current.href;
      },
      replace: (url) => {
        self.history.replaceState(null, '', url);
      },
    },
    removeEventListener: (event, callback, options) => {
      if (event === 'popstate') {
        const testListener = { callback, capture: options?.capture ?? false, event };
        listeners = listeners.filter((listener) => isListenerMatch(listener, testListener));
      }
    },
  };

  return self;
};

export { type LiteWindow, createLiteWindow };
