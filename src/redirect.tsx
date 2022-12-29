import { useEffect } from 'react';

import { useJsonMemo } from './internal/use-json-memo.js';
import { useRouter } from './use-router.js';

type RedirectProps = {
  readonly href?: string;
  readonly state?: {} | null;
};

const Redirect = (props: RedirectProps): null => {
  const { href, state } = useJsonMemo(props);
  const router = useRouter();

  useEffect(() => router.go({ href, replace: true, state }), [router, href, state]);

  return null;
};

export { type RedirectProps, Redirect };
