import { describe, expect, test, vitest } from 'vitest';

import { renderWithRouter } from './__test.js';
import { BrowserRouter } from './browser-router.js';

describe('BrowserRouter', () => {
  test('uses window.history and decodes path routes', async () => {
    const pushState = vitest.spyOn(window.history, 'pushState');
    const { router } = renderWithRouter(null, BrowserRouter);

    router.go('/foo?bar#baz');

    expect(pushState).toHaveBeenCalledOnce();
    expect(router.location).toMatchInlineSnapshot(`
      {
        "hash": "#baz",
        "href": "http://localhost:3000/foo?bar#baz",
        "path": "/foo",
        "search": "?bar",
        "state": null,
      }
    `);
  });
});
