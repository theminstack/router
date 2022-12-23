type RouteMatch = {
  /** Hash string including `#` prefix if non-empty. */
  readonly hash: '' | `#${string}`;
  /** True if the matched pattern contained path parameters. */
  readonly isParameterized: boolean;
  /** True if the matched pattern ended with a wildcard. */
  readonly isPrefix: boolean;
  /** Path parameter value map. */
  readonly params: Readonly<Record<string, string | undefined>>;
  /** Matched full path, including a wildcard part. */
  readonly path: `/${string}`;
  /** Matched prefix path, excluding a wildcard part. */
  readonly pathPrefix: `/${string}`;
  /** Matched pattern, including a wildcard. */
  readonly pattern: string;
  /** Matched pattern, excluding a wildcard. */
  readonly patternPrefix: string;
  /** Search (query) string including `?` prefix if non-empty. */
  readonly search: '' | `?${string}`;
  /** History state data (JSON serializable). */
  readonly state: {} | null;
};

export { type RouteMatch };
