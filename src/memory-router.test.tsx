import { describe, expect, test, vitest } from 'vitest';

import { renderWithRouter } from './__test.js';
import { MemoryRouter } from './memory-router.js';

describe('BrowserHashRouter', () => {
  test('does not use window.history (memory only) and decodes hash routes', async () => {
    const pushState = vitest.spyOn(window.history, 'pushState');
    const { router } = renderWithRouter(MemoryRouter);

    router.go('/foo?bar#baz');

    expect(pushState).not.toHaveBeenCalled();
    expect(router.location).toMatchInlineSnapshot(`
      {
        "hash": "#baz",
        "href": "http://localhost/foo?bar#baz",
        "path": "/foo",
        "search": "?bar",
        "state": null,
      }
    `);
  });
});
