import { type Match } from './match.js';

type Matcher<TArgs> = (pathname: string) => [Match, TArgs] | [null, null];

export { type Matcher };
