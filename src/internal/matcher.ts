import { type Match } from './match.js';

type Matcher<TArgs> = (path: string) => [Match, TArgs] | [null, null];

export { type Matcher };
