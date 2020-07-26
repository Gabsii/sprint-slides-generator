import App from 'next/app';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '@utils/theme';
import { TokenProvider } from '@utils/ctx/TokenContext';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <TokenProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </TokenProvider>
      </ThemeProvider>
    );
  }
}
