# MinStack Router

Basic declarative routing for React.

The [MinStack](https://minstack.rocks) Philosophy:

- **Simple:** Minimal and opinionated APIs and feature sets.
- **Small:** Zero dependencies and smaller bundles than most alternatives.
- **Fast:** Optimization through simplicity.
- **Typed:** Written in Typescript. Designed for Typescript.

---

- [Match Routes By Path](#match-routes-by-path)
  - [Path Parameters](#path-parameters)
  - [Match Data](#match-data)
  - [Exclusive Routes](#exclusive-routes)
- [Navigate On Click](#navigate-on-click)
- [Redirect On Mount](#redirect-on-mount)
- [Use Alternate Routers](#use-alternate-routers)
  - [Browser Path](#browser-path)
  - [Browser Hash](#browser-hash)
  - [Memory Only](#memory-only)

## Match Routes By Path

Use the `Route` component.

```tsx
render(
  <Route path={'/foo'}>
    <p>Only rendered if the route is exactly "/foo".</p>
  </Route>,
);
```

The `path` property also accepts an array of paths.

```tsx
render(
  <Route path={['/foo', '/bar']}>
    <p>Only rendered if the route is exactly "/foo" or "/bar".</p>
  </Route>,
);
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

render(
  <Route path={'/user/:id'}>
    <User />
  </Route>,
);
```

Parameter names can only contain letters, numbers, and underscores (`_`). If two parameters with the same name are present, only the value for the last one will be captured.

Path parameters are never optional, and will (non-greedy) match everything up to the next forward slash (`/`).

Because parameters are non-greedy, they can be separated by any character other than a number, letter, or underscore (eg. `:foo-:bar`). However, If there is no separator between parameters (eg. `:foo:bar`), every parameter except the last one will always be empty (`""`).

A path may also end with a wildcard (`/*`). Wildcards are only allowed at the end of a path, and must be preceded by a forward slash. The value matched by the wildcard is stored in `params["*"]`. An asterisk (`*`) anywhere else else in the path is matched literally.

```tsx
const File = () => {
  const { params } = useRouteMatch();
  return <div>Filename: {params["*"]}</div>
};

render(
  <Route path={"/file/*"}>
    <File />
  </Route>
);
```

### Match Data

The `useRoute` and `useRouteMatch` hooks return the following data.

```tsx
type RouteMatch = {
  /** True if the matched pattern contained path parameters. */
  readonly isParameterized: boolean;
  /** True if the matched pattern ended with a wildcard. */
  readonly isPrefix: boolean;
  /** Matched pattern, excluding a wildcard. */
  readonly pattern: string;
  /** Matched full pathname, including a wildcard part. */
  readonly pathname: `/${string}`;
  /** Matched pathname, excluding a wildcard part. */
  readonly prefix: `/${string}`;
  /** Path parameter value map. */
  readonly params: Readonly<Record<string, string | undefined>>;
  /** Search (query) string including `?` prefix if non-empty. */
  readonly search: '' | `?${string}`;
  /** Hash string including `#` prefix if non-empty. */
  readonly hash: '' | `#${string}`;
  /** History state data (JSON serializable). */
  readonly state: {} | null;
}
```

### Exclusive Routes

To match only one route from a set, wrap the `Route` components in a `Routes` parent.

```tsx
render(
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
```

**NOTE:** The `useRoute` hook is not affected by a `<Routes>` parent.

## Navigate On Click

## Redirect On Mount

## Use Alternate Routers

### Browser Path

### Browser Hash

### Memory Only
