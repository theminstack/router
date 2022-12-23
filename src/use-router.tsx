import { useContext } from 'react';

import { RouterContext } from './router-context.js';

const useRouter = () => useContext(RouterContext);

export { useRouter };
