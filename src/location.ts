type Location = {
  readonly data: any;
  readonly pathname: string;
  readonly search: string;
};

const resolve = (...paths: string[]): string => {
  const segments: string[] = [];

  for (const path of paths) {
    const pathSegments = path.split('/');

    if (pathSegments.at(0) === '') {
      segments.length = 0;
    }

    for (const pathSegment of pathSegments) {
      switch (pathSegment) {
        case '':
        case '.':
          break;
        case '..':
          segments.pop();
          break;
        default:
          segments.push(pathSegment);
          break;
      }
    }
  }

  return '/' + segments.join('/');
};

const encode = (value: string): string => {
  return value.replace(/[:?#\s]/gu, (match) => {
    switch (match) {
      case ':':
        return '%3A';
      case '?':
        return '%3F';
      case '#':
        return '%23';
      default:
        return '%20';
    }
  });
};

const createLocation = (locationOrUri: Partial<Location> | string = {}, previous: Partial<Location> = {}): Location => {
  const [rawPathname = '', rawSearch = '', data] =
    typeof locationOrUri === 'string'
      ? (locationOrUri.replace(/^https?:\/{2}[^/?#]+/u, '').split('#', 1)[0] ?? '').split('?', 2)
      : [locationOrUri.pathname, locationOrUri.search, locationOrUri.data];
  const pathname = encode(resolve(previous.pathname ?? '', rawPathname ?? ''));
  const query = encode((rawSearch || previous.search || '').replace(/^\?/u, ''));
  const search = query ? '?' + query : '';

  return {
    data: data ?? previous.data ?? null,
    pathname,
    search,
  };
};

const getLocationUri = (location: Location): string => {
  return `${location.pathname}${location.search}`;
};

const getLocationPathUri = (location: Location): string => {
  return `${getLocationUri(location)}${window.location.hash}`;
};

const getLocationHashUri = (location: Location): string => {
  return `${window.location.pathname}${window.location.search}#${getLocationUri(location)}`;
};

export { type Location, createLocation, getLocationHashUri, getLocationPathUri, getLocationUri };
