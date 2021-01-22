import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { SWRConfig } from 'swr';
import {
  AppBar,
  createMuiTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

function CustomApp({ Component, pageProps }: AppProps) {
  const theme = createMuiTheme({ palette: { type: 'dark' } });
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
        <ThemeProvider theme={theme}>
          <AppBar color={'inherit'} position={'static'}>
            <Toolbar>
              <Typography variant={'h6'} style={{ flexGrow: 1 }}>
                CHEAP ROULETTE
              </Typography>
              <IconButton
                href={`https://github.com/takeshiemoto/cheap-roulette`}
              >
                <GitHub />
              </IconButton>
            </Toolbar>
          </AppBar>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default CustomApp;
