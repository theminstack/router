type Match = {
  readonly isParameterized: boolean;
  readonly isPrefix: boolean;
  readonly params: Readonly<Record<string, string | undefined>>;
  readonly path: `/${string}`;
  readonly pathPrefix: `/${string}`;
  readonly pattern: `/${string}`;
  readonly patternPrefix: `/${string}`;
};

export { type Match };
