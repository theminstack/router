import { type SyntheticEvent, useCallback } from 'react';

import { getRouterNavigation } from './get-router-navigation.js';
import { useJsonMemo } from './internal/use-json-memo.js';
import { type Router } from './router.js';
import { useRouter } from './use-router.js';

const useNavigate = (target?: Parameters<Router['go']>[0]): ((event?: SyntheticEvent<Element, any>) => void) => {
  const stableTarget = useJsonMemo(target);
  const router = useRouter();

  return useCallback(
    (event) => {
      if (event?.isDefaultPrevented()) {
        return;
      }

      event?.preventDefault();
      router.go({ to: event?.currentTarget.getAttribute('href') || undefined, ...getRouterNavigation(stableTarget) });
    },
    [router, stableTarget],
  );
};

export { useNavigate };
