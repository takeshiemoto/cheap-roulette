import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { SWRConfig } from 'swr';

function CustomApp({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default CustomApp;
