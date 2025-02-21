// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    height: 100%;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
