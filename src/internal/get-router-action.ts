import { type RouterAction } from '../router-action.js';

const getRouterAction = (action?: RouterAction | number | string): RouterAction => {
  return typeof action === 'object' && action != null
    ? 'delta' in action
      ? { delta: action.delta }
      : {
          ...(action.replace == null ? {} : { replace: action.replace }),
          ...(action.state == null ? {} : { state: action.state }),
          ...(action.href == null ? {} : { href: action.href }),
        }
    : typeof action === 'string'
    ? { href: action }
    : typeof action === 'number'
    ? { delta: action }
    : {};
};

export { getRouterAction };
