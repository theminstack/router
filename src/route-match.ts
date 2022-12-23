type RouteMatch = {
  /** Hash string including `#` prefix if non-empty. */
  readonly hash: '' | `#${string}`;
  /** True if the matched pattern contained path parameters. */
  readonly isParameterized: boolean;
  /** True if the matched pattern ended with a wildcard. */
  readonly isPrefix: boolean;
  /** Path parameter value map. */
  readonly params: Readonly<Record<string, string | undefined>>;
  /** Matched full pathname, including a wildcard part. */
  readonly pathname: `/${string}`;
  /** Matched pattern, excluding a wildcard. */
  readonly pattern: string;
  /** Matched pathname, excluding a wildcard part. */
  readonly prefix: `/${string}`;
  /** Search (query) string including `?` prefix if non-empty. */
  readonly search: '' | `?${string}`;
  /** History state data (JSON serializable). */
  readonly state: {} | null;
};

export { type RouteMatch };
