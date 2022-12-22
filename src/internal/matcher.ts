type Match = {
  /**
   * True if the {@link Match.pattern pattern} contained path parameters
   * (`:param`).
   */
  readonly isParameterized: boolean;
  /**
   * True if the {@link Match.pattern pattern} ended with a
   * wildcard (`/*`).
   */
  readonly isWildcard: boolean;
  /**
   * Parameters extracted from the pathname using the
   * {@link Match.pattern}.
   *
   * If a wildcard was present, the `"*"` key will contain the matched
   * value.
   */
  readonly params: Readonly<Record<string, string | undefined>>;
  /**
   * The full pathname matched, including the part matched by a wildcard
   * (if any).
   */
  readonly pathname: `/${string}`;
  /**
   * Pattern used to match the route.
   *
   * If the router pattern ended with a wildcard (`/*`), then the asterisk
   * will be removed so that it can be used to build child routes.
   */
  readonly pattern: string;
  /**
   * The the part of the pathname matched by the {@link Match.pattern},
   * without the part matched by the wildcard (if any).
   */
  readonly prefix: `/${string}`;
};

type Matcher<TArgs> = (pathname: string) => [Match, TArgs] | [null, null];

const createMatcher = <TArgs>(path: string, args: TArgs = undefined as TArgs): Matcher<TArgs> => {
  let isParameterized = false;
  let isWildcard = false;

  const names: string[] = [];
  const expression = path
    .replace(/:(\w+)|(?:^|\/)([*])$|[|\\{}()[\]^$+*?.]|-/gu, (match, name, wildcard) => {
      if (name) {
        isParameterized = true;
        names.push(name);
        return '([^/]*?)(?=[/-]|$)';
      }

      if (wildcard) {
        isWildcard = true;
        names.push('*');
        return '/(.*)';
      }

      return `\\${match === '-' ? 'x2d' : match}`;
    })
    .replace(/^(?!\/)/u, '/');
  const rx = new RegExp('^' + expression + '$', 'u');

  return (pathname) => {
    const match = pathname.match(rx);

    if (!match) {
      return [null, null];
    }

    const params: Record<string, string | undefined> = {};

    match.slice(1).forEach((value, i) => (params[names[i] as string] = value));

    return [
      {
        isParameterized,
        isWildcard,
        params,
        pathname: pathname as `/${string}`,
        pattern: path.replace(/\/\*$/u, '/'),
        prefix: pathname.slice(0, pathname.length - (params['*']?.length ?? 0)) as `/${string}`,
      },
      args,
    ];
  };
};

export { type Match, type Matcher, createMatcher };
