import { RecoilRoot } from 'recoil'
import { globalPortalHost } from '../constants/ui'
import AppContainer from '../containers'
import AuthModal from '../components/auth-modal'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
      <div id={globalPortalHost}></div>
    </RecoilRoot>
  )
}

export default MyApp
