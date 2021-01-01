import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import { globalPortalHost } from '../constants/ui'
import AppContainer from '../containers'
import { CookiesProvider } from 'react-cookie'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <AppContainer>
          <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#667EEA" />
            <meta name="msapplication-TileColor" content="#667EEA" />
            <meta name="theme-color" content="#667EEA" />
            <title>Tweeter | App</title>
          </Head>
          <Component {...pageProps} />
        </AppContainer>
        <div id={globalPortalHost}></div>
      </CookiesProvider>
    </RecoilRoot>
  )
}

export default MyApp
