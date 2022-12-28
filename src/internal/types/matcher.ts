import { type Match } from './match.js';

type Matcher = (path: string) => Match | null;

export { type Matcher };
