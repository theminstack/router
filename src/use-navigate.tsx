import { type SyntheticEvent, useCallback } from 'react';

import { getRouterAction } from './internal/get-router-action.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { type RouterAction } from './types/router-action.js';
import { useRouter } from './use-router.js';

const useNavigate = (action?: RouterAction | number | string): ((event?: SyntheticEvent<Element, any>) => void) => {
  const stableAction = useJsonMemo(action);
  const router = useRouter();

  return useCallback(
    (event) => {
      if (event?.isDefaultPrevented()) {
        return;
      }

      event?.preventDefault();
      router.go({ href: event?.currentTarget.getAttribute('href') || undefined, ...getRouterAction(stableAction) });
    },
    [router, stableAction],
  );
};

export { useNavigate };
