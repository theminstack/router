import { useEffect } from 'react';

import { useJsonMemo } from './internal/use-json-memo.js';
import { type UrlLike } from './router.js';
import { useRouter } from './use-router.js';

type RedirectProps = {
  readonly state?: {} | null;
  readonly url?: UrlLike;
};

const Redirect = (props: RedirectProps): null => {
  const { url, state } = useJsonMemo(props);
  const router = useRouter();

  useEffect(() => router.go({ state, to: url }), [router, url, state]);

  return null;
};

export { type RedirectProps, Redirect };
