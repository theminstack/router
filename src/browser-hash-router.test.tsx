import { describe, expect, test, vitest } from 'vitest';

import { renderWithRouter } from './__test.js';
import { BrowserHashRouter } from './browser-hash-router.js';

describe('BrowserHashRouter', () => {
  test('uses window.history and decodes hash routes', async () => {
    const pushState = vitest.spyOn(window.history, 'pushState');
    const { router } = renderWithRouter(null, BrowserHashRouter);

    router.go('#/foo?bar#baz');

    expect(pushState).toHaveBeenCalledOnce();
    expect(router.location).toMatchInlineSnapshot(`
      {
        "hash": "#baz",
        "href": "http://localhost:3000/#/foo?bar#baz",
        "path": "/foo",
        "search": "?bar",
        "state": null,
      }
    `);
  });
});
