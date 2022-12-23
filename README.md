# MinStack Router

Basic declarative routing for React.

The [MinStack](https://minstack.rocks) Philosophy:

- **Simple:** Minimal and opinionated APIs and feature sets.
- **Small:** Zero dependencies and smaller bundles than most alternatives.
- **Fast:** Optimization through simplicity.
- **Typed:** Written in Typescript. Designed for Typescript.

---

- [Getting Started](#getting-started)
- [Match Routes By Path](#match-routes-by-path)
  - [Path Parameters](#path-parameters)
  - [Match Data](#match-data)
  - [Exclusive Routes](#exclusive-routes)
- [Navigate On Click](#navigate-on-click)
- [Redirect On Mount](#redirect-on-mount)

## Getting Started

Wrap your application with a router: `BrowserRouter`, `BrowserHashRouter`, or `MemoryRouter`.

```tsx
import { BrowserRouter } from '@minstack/router';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

Any component or hook which depends on a router, will throw an error if no router parent is present.

The `BrowserHashRouter` is useful when the application's server does not support SPAs (eg. GitHub Pages). An SPA-compatible server will serve the application index file when a non-existent path is requested.

The `MemoryRouter` is useful for SSR and testing, when there is no `window` global.

## Match Routes By Path

Use the `Route` component.

```tsx
const App = () => {
  return (
    <Route path={'/foo'}>
      <p>Only rendered if the route is exactly "/foo".</p>
    </Route>,
  );
};
```

The `path` property also accepts an array of paths.

```tsx
const App = () => {
  return (
    <Route path={['/foo', '/bar']}>
      <p>Only rendered if the route is exactly "/foo" or "/bar".</p>
    </Route>,
  );
};
```

The leading `/` is optional, but omitting it does _NOT_ make the path relative. Paths are always absolute, and the slash is simply added when not present.

Routes can also be matched with the `useRoute` hook.

```tsx
// Match a single path...
const match = useRoute('/foo');

// Or, multiple paths...
const match = useRoute(['/foo', '/bar']);
```

The returned match will be `null` if the route is not matched, or an object containing [match data](#match-data) if the route is matched.

### Path Parameters

Non-exact paths can be matched using path parameters.

```tsx
const User = () => {
  const { params } = useRouteMatch();
  return <div>UserID: {params.id}</div>;
};

const App = () => {
  return (
    <Route path={'/user/:id'}>
      <User />
    </Route>,
  );
};
```

Parameter names can only contain letters, numbers, and underscores (`_`). If two parameters with the same name are present, only the value for the last one will be captured.

Path parameters are never optional, and will (non-greedy) match everything up to the next forward slash (`/`).

Because parameters are non-greedy, they can be separated by any character other than a number, letter, or underscore (eg. `:foo-:bar`). However, If there is no separator between parameters (eg. `:foo:bar`), every parameter except the last one will always be empty (`""`).

A path may also end with a wildcard (`/*`). Wildcards are only allowed at the end of a path, and must be preceded by a forward slash. The value matched by the wildcard is stored in `params["*"]`. An asterisk (`*`) anywhere else else in the path is matched literally.

```tsx
const File = () => {
  const { params } = useRouteMatch();
  return <div>Filename: {params['*']}</div>;
};

const App = () => {
  return (
    <Route path={'/file/*'}>
      <File />
    </Route>,
  );
};
```

### Match Data

The `useRoute` and `useRouteMatch` hooks return the following data.

```tsx
type RouteMatch = {
  /** True if the matched pattern contained path parameters. */
  readonly isParameterized: boolean;
  /** True if the matched pattern ended with a wildcard. */
  readonly isPrefix: boolean;
  /** Matched pattern, including a wildcard. */
  readonly pattern: string;
  /** Matched pattern, excluding a wildcard. */
  readonly patternPrefix: string;
  /** Matched full path, including a wildcard part. */
  readonly path: `/${string}`;
  /** Matched prefix path, excluding a wildcard part. */
  readonly pathPrefix: `/${string}`;
  /** Path parameter value map. */
  readonly params: Readonly<Record<string, string | undefined>>;
  /** Search (query) string including `?` prefix if non-empty. */
  readonly search: '' | `?${string}`;
  /** Hash string including `#` prefix if non-empty. */
  readonly hash: '' | `#${string}`;
  /** History state data (JSON serializable). */
  readonly state: {} | null;
};
```

### Exclusive Routes

To match only one route from a set, wrap the `Route` components in a `Routes` parent.

```tsx
const App = () => {
  return (
    <Routes>
      <Route path={'/user/settings'}>...</Route>
      <Route path={'/user/:id'}>
        <p>Never matches "/user/settings" due to the previous route.</p>
      </Route>
      <Route>
        <p>Catch-all route matches anything not matched above.</p>
      </Route>
    </Routes>,
  );
};
```

**NOTE:** The `useRoute` hook is not affected by a `<Routes>` parent.

## Navigate On Click

No `<Link>` component is provided. Instead, a `useNavigate` hook is provided which returns a navigation callback.

```tsx
const App = () => {
  const navigate = useNavigate();

  return (
    <a onClick={navigate} href={'/target/path'}>
      <span>Click Here</span>
    </a>
  );
};
```

The callback calls `event.preventDefault()` and pushes the `event.currentTarget.href` onto the browser history.

A url can be passed to the hook in cases where the clickable element does not have an `href` property (eg. buttons).

```tsx
const App = () => {
  const navigate = useNavigate('/target/path');

  return (
    <button onClick={navigate}>
      <span>Click Here</span>
    </button>
  );
};
```

When a url is passed directly to the hook, the callback can be called without an event (eg. `navigate()`), and it will still trigger the navigation.

History state data can be provided and the current history entry can be replaced (instead of pushed) by passing an options object to the hook.

```tsx
const navigate = useNavigate({
  href: '/target/path',
  state: { key: 'value' },
  replace: true,
});
```

A number can be passed to the hook to navigate forward (positive) and backward (negative) through the browser's history, or to reload the page (zero).

```tsx
// Back
const navigate = useNavigate(-1);

// Forward
const navigate = useNavigate(1);

// Reload
const navigate = useNavigate(0);
```

## Redirect On Mount

The `Redirect` component can be used to replace the current history entry as soon as it is mounted. The history entry is _always_ replaced (not pushed) to avoid blocking back navigation.

```tsx
const App = () => {
  return (
    <Route path={'/go-home'}>
      <Redirect href="/" />
    </Route>
  );
};
```

It also accepts an optional `state` property to set history state data.

```tsx
const App = () => {
  return (
    <Route path={'/go-home'}>
      <Redirect href="/" state={{ key: 'value' }} />
    </Route>
  );
};
```
