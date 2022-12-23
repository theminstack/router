type Match = {
  readonly isParameterized: boolean;
  readonly isPrefix: boolean;
  readonly params: Readonly<Record<string, string | undefined>>;
  readonly pathname: `/${string}`;
  readonly pattern: string;
  readonly prefix: `/${string}`;
};

export { type Match };
