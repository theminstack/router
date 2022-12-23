type RouterLocation = {
  readonly hash: '' | `#${string}`;
  readonly href: `${'http' | 'https'}://${string}`;
  readonly pathname: `/${string}`;
  readonly search: '' | `?${string}`;
  readonly state: {} | null;
};

export { type RouterLocation };
