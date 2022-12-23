import { useEffect, useState } from 'react';

import { type RouterLocation } from './router-location.js';
import { useRouter } from './use-router.js';

const useLocation = (): RouterLocation => {
  const router = useRouter();
  const [location, setLocation] = useState<RouterLocation>(router.location);

  useEffect(() => {
    setLocation(() => router.location);
    return router.subscribe(() => setLocation(router.location));
  }, [router]);

  return location;
};

export { useLocation };
