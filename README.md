# MinStack Router

Basic declarative routing for React.

**It does:**

- Match routes by path (`<Route>`)
- Match one route exclusively from a set of routes (`<Routes>`)
- Use path parameters and wildcards (`useParam()`, `useRouteMatch()`)
- Integrate with any clickable element (`useNavigate()`, `useNavigateBack()`)
- Integrate with the browser history API (path or hash)
- Support memory-only operation
- Support redirection (`<Redirect>`)
- Support navigation blocking (`<ConfirmNavigation>`, `useConfirmNavigation()`)
- Support accessing search/query parameters (`useSearchParams()`, `useLocation()`)

**It does not:**

- Match routes by search parameter
- Provide lazy loading
- Provide error boundaries
- Provide a `<Link>` component

This is a router, and all it does is route, navigate, and provide access to related information. Everything else is up to the rendered route content and leveraging the core API.

Search parameter routing is an anti-pattern. It is not consistently supported by web servers (eg. NGINX, ExpressJS). It is contrary to the semantic purpose of the query string, which is to refine the data/operation indicated by the URI host/path.

Lazy loading can be handled with `React.lazy()`, dynamic `import()`, and the `<Suspense>` component. Building it into a router is unnecessary overhead which increases the library size while _reducing_ flexibility.

Error boundaries are also something that can easily be implemented as needed or provided by a separate purpose-built library.

Instead of a `<Link>` component, the `useNavigate()` and `useNavigateBack()` hooks return callbacks which can be passed to the `onClick` event of any element. This provides greater flexibility for integration with existing link/button components.

## Route

## Routes

## Path Parameters

## Links

## Browser Routing

### Path

### Hash

## Memory Routing

## Navigation Blocking

## Search Parameters
