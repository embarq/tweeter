import { RecoilRoot } from 'recoil'
import { globalPortalHost } from '../constants/ui'
import UserContextComp from '../core/user.context'
import AuthModal from '../components/auth-modal'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <UserContextComp>
        <Component {...pageProps} />
        <div id={globalPortalHost}></div>
        <AuthModal />
      </UserContextComp>
    </RecoilRoot>
  )
}

export default MyApp
