import { beforeEach, vitest } from 'vitest';

beforeEach(() => {
  vitest.spyOn(window, 'scrollTo').mockReturnValue();
  document.head.innerHTML = '';
});
