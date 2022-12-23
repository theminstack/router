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
  readonly scrollTo: (options: { behavior: ScrollBehavior; left: 0; top: 0 }) => void;
};

export { type LiteWindow };
