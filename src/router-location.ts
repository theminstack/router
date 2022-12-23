type RouterLocation = {
  readonly hash: '' | `#${string}`;
  readonly href: `${'http' | 'https'}://${string}`;
  readonly path: `/${string}`;
  readonly search: '' | `?${string}`;
  readonly state: {} | null;
};

export { type RouterLocation };
