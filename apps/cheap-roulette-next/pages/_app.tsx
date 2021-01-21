import React, { useMemo } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { SWRConfig } from 'swr';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core';

function CustomApp({ Component, pageProps }: AppProps) {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });

  return (
    <>
      <Head>
        <title>Welcome to cheap-roulette-next!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SWRConfig
        value={{ fetcher: (args) => fetch(args).then((res) => res.json()) }}
      >
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default CustomApp;
