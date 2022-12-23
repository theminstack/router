import { type RouterAction } from './router-action.js';
import { type RouterLocation } from './router-location.js';

type Router = {
  readonly go: (action?: RouterAction | number | string) => void;
  readonly isPushed: boolean;
  readonly location: RouterLocation;
  readonly subscribe: (subscriber: () => void) => () => void;
};

export { type Router };
