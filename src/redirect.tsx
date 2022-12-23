import { useEffect } from 'react';

import { useJsonMemo } from './internal/use-json-memo.js';
import { type UrlLike } from './url-like.js';
import { useRouter } from './use-router.js';

type RedirectProps = {
  readonly push?: boolean;
  readonly state?: {} | null;
  readonly url?: UrlLike | string;
};

const Redirect = (props: RedirectProps): null => {
  const { url, state, push = false } = useJsonMemo(props);
  const router = useRouter();

  useEffect(() => router.go({ replace: !push, state, to: url }), [router, url, state, push]);

  return null;
};

export { type RedirectProps, Redirect };
