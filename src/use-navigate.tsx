import { type SyntheticEvent, useCallback } from 'react';

import { useJsonMemo } from './internal/use-json-memo.js';
import { type Router, getNavigation } from './router.js';
import { useRouter } from './use-router.js';

type NavigateProps = {
  (event?: SyntheticEvent<Element, any>): void;
  readonly href: string;
  readonly onClick: (event?: SyntheticEvent<Element, any>) => void;
};

const useNavigate = (target?: Parameters<Router['go']>[0]): NavigateProps => {
  const stableTarget = useJsonMemo(target);
  const router = useRouter();
  const href = router.getHref(target);
  const onClick: NavigateProps['onClick'] = useCallback(
    (event) => {
      if (event?.isDefaultPrevented()) {
        return;
      }

      event?.preventDefault();
      router.go({ to: event?.currentTarget.getAttribute('href') ?? undefined, ...getNavigation(stableTarget) });
    },
    [router, stableTarget],
  );

  return Object.assign(onClick, { href, onClick });
};

export { useNavigate };
