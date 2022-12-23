import { type UrlLike } from './url-like.js';

type RouterNavigation = {
  readonly replace?: boolean;
  readonly state?: {} | null;
  readonly to?: UrlLike | number | string;
};

export { type RouterNavigation };
