import { type RouterNavigation } from '../router-navigation.js';
import { type UrlLike } from '../url-like.js';

const getRouterNavigation = (target?: RouterNavigation | UrlLike | number | string): RouterNavigation => {
  return typeof target === 'object' && target != null && !('href' in target)
    ? {
        ...(target.replace == null ? {} : { replace: target.replace }),
        ...(target.state == null ? {} : { state: target.state }),
        ...(target.to == null ? {} : { to: target.to }),
      }
    : target == null
    ? {}
    : { to: target };
};

export { getRouterNavigation };
