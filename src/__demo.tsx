/* eslint-disable max-lines */
import 'normalize.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import {
  createHashRouter,
  Redirect,
  Route,
  RouterContext,
  Routes,
  useNavigate,
  useRouteMatch,
  useRouter,
} from './index.js';

const GlobalStyle = createGlobalStyle`
  body {
    color: #ccc;
    background-color: #000;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Display = () => {
  const router = useRouter();
  const match = useRouteMatch();

  return (
    <pre>
      <code>{JSON.stringify({ isPushed: router.isPushed, match }, null, 2)}</code>
    </pre>
  );
};

const SubRoutes = () => {
  const { pattern = '/' } = useRouteMatch() ?? {};

  return (
    <Routes>
      <Route path={`${pattern}a`}>
        <Display />
      </Route>
      <Route path={`${pattern}b`}>
        <Display />
      </Route>
    </Routes>
  );
};

const Demo = () => {
  const back = useNavigate(-1);
  const forward = useNavigate(1);
  const a = useNavigate({ state: { foo: 'bar' }, to: '/a' });
  const href = useNavigate();
  const replace = useNavigate({ replace: true, to: '/c' });

  return (
    <div>
      <ul>
        <li>
          <a onClick={href} href="/">
            Home
          </a>
        </li>
        <li>
          <a {...back}>Back</a>
        </li>
        <li>
          <a {...forward}>Forward</a>
        </li>
        <li>
          <a {...a}>Push: {a.href}</a>
        </li>
        <li>
          <a onClick={href} href="/b">
            Push: /b (href)
          </a>
        </li>
        <li>
          <a {...replace}>Replace {replace.href}</a>
        </li>
        <li>
          <a onClick={href} href="/d/1/2/a/b/c">
            Push: /d/1/2/a/b/c (href)
          </a>
        </li>
        <li>
          <a onClick={href} href="/e/1-2">
            Push: /e/1-2 (href)
          </a>
        </li>
        <li>
          <a onClick={href} href="/e/1-2-3">
            Push: /e/1-2-3 (href)
          </a>
        </li>
        <li>
          <a onClick={href} href="/f/a">
            Push: /f/a (href)
          </a>
        </li>
        <li>
          <a onClick={href} href="/f/b">
            Push: /f/b (href)
          </a>
        </li>
        <li>
          <a onClick={href} href="/abc">
            Push: /abc (href)
          </a>
        </li>
        <li>
          <a onClick={href} href="/redirect">
            Redirect
          </a>
        </li>
      </ul>
      <Routes>
        <Route path="/a">
          <Display />
        </Route>
        <Route path="/b">
          <Display />
        </Route>
        <Route path="/c">
          <Display />
        </Route>
        <Route path="/d/:foo/:foo/*">
          <Display />
        </Route>
        <Route path="/e/:foo-:bar">
          <Display />
        </Route>
        <Route path="/f/*">
          <SubRoutes />
        </Route>
        <Route path="/redirect">
          <Redirect url={'/'} replace />
        </Route>
        <Route>
          <Display />
        </Route>
      </Routes>
      <SubRoutes />
      <Route>
        <Display />
      </Route>
    </div>
  );
};

// const router = createHashRouter();

createRoot(document.body.appendChild(document.createElement('div'))).render(
  <StrictMode>
    <GlobalStyle />
    {/* <RouterContext.Provider value={router}> */}
      <Demo />
    {/* </RouterContext.Provider> */}
  </StrictMode>,
);
