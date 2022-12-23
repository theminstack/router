import { type RouterLocation } from './router-location.js';
import { type RouterNavigation } from './router-navigation.js';
import { type UrlLike } from './url-like.js';

type Router = {
  readonly go: {
    (urlLike?: UrlLike | string): void;
    (delta?: number): void;
    (navigation?: RouterNavigation): void;
    (target?: RouterNavigation | UrlLike | number | string): void;
  };
  readonly isPushed: boolean;
  readonly location: RouterLocation;
  readonly subscribe: (subscriber: () => void) => () => void;
};

export { type Router };
