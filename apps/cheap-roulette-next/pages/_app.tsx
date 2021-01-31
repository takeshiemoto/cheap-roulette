import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { SWRConfig } from 'swr';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  createMuiTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { GitHub, Shuffle } from '@material-ui/icons';

function CustomApp({ Component, pageProps }: AppProps) {
  const theme = createMuiTheme({ palette: { type: 'dark' } });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
