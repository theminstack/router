import { useEffect } from 'react';

import { useJsonMemo } from './internal/use-json-memo.js';
import { type UrlLike } from './router.js';
import { useRouter } from './use-router.js';

type RedirectProps = {
  readonly replace?: boolean;
  readonly state?: {} | null;
  readonly url?: UrlLike;
};

const Redirect = (props: RedirectProps): null => {
  const { url, state, replace } = useJsonMemo(props);
  const router = useRouter();

  useEffect(() => router.go({ replace, state, to: url }), [router, url, state, replace]);

  return null;
};

export { type RedirectProps, Redirect };
