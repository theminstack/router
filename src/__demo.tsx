/* eslint-disable max-lines */
import 'normalize.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import { BrowserRouter, Redirect, Route, Routes, useNavigate, useRouteMatch, useRouter } from './index.js';

const routePrefix = '';

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
  const a = useNavigate({ state: { foo: 'bar' }, to: routePrefix + '/a' });
  const push = useNavigate();
  const replace = useNavigate({ replace: true });

  return (
    <div>
      <ul>
        <li>
          <a onClick={push} href="/">
            Home
          </a>
        </li>
        <li>
          <a onClick={back} href="#">
            Back
          </a>
        </li>
        <li>
          <a onClick={forward} href="#">
            Forward
          </a>
        </li>
        <li>
          <a onClick={a} href={routePrefix + '/a'}>
            Push: a
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/b'}>
            Push: b
          </a>
        </li>
        <li>
          <a onClick={replace} href={routePrefix + '/c'}>
            Replace: c
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/d/1/2/a/b/c'}>
            Push: /d/1/2/a/b/c
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '../d'}>
            Push: ../d
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/e/1-2'}>
            Push: /e/1-2 (href)
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/e/1-2-3'}>
            Push: /e/1-2-3 (href)
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/f/a'}>
            Push: /f/a
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/f/b'}>
            Push: /f/b
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/abc'}>
            Push: /abc
          </a>
        </li>
        <li>
          <a onClick={push} href={routePrefix + '/redirect'}>
            Push: /redirect
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
          <Redirect url={routePrefix + '/'} />
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
    <BrowserRouter>
      <Demo />
    </BrowserRouter>
  </StrictMode>,
);
