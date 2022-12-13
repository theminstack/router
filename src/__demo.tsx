import 'normalize.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: #ccc;
    background-color: #000;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

createRoot(document.body.appendChild(document.createElement('div'))).render(
  <StrictMode>
    <GlobalStyle />
    <div>Hello, World!</div>
  </StrictMode>,
);
