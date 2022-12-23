import { type Matcher } from './matcher.js';

const createMatcher = <TArgs>(path: string, args: TArgs = undefined as TArgs): Matcher<TArgs> => {
  let isParameterized = false;
  let isPrefix = false;

  const names: string[] = [];
  const expression = path
    .replace(/:(\w+)|(?:^|\/)([*])$|[|\\{}()[\]^$+*?.]|-/gu, (match, name, wildcard) => {
      if (name) {
        isParameterized = true;
        names.push(name);
        return '([^/]*?)';
      }

      if (wildcard) {
        isPrefix = true;
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
        isPrefix,
        params,
        pathname: pathname as `/${string}`,
        pattern: path.replace(/\/\*$/u, '/'),
        prefix: pathname.slice(0, pathname.length - (params['*']?.length ?? 0)) as `/${string}`,
      },
      args,
    ];
  };
};

export { createMatcher };
