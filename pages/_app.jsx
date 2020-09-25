import { RecoilRoot } from 'recoil'
import { globalPortalHost } from '../constants/ui'
import AppContainer from '../containers'
import { CookiesProvider } from 'react-cookie'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
        <div id={globalPortalHost}></div>
      </CookiesProvider>
    </RecoilRoot>
  )
}

export default MyApp
