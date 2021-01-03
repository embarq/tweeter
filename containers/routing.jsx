import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import AuthModal from '../components/auth-modal'
import AppLoading from '../components/app-loading'
import * as state from '../constants/state'

const memberRoutes = [
  '/',  // TODO: will be landing page, remove later
  '/home',
  '/me',
  '/bookmarks',
  '/messages',
  '/me/profile',
  '/me/account',
  '/me/settings',
]

export default function RouingContainer({ children }) {
  const { pathname } = useRouter()
  const userLoading = useRecoilValue(state.userLoading)
  const user = useRecoilValue(state.userId)

  if (!userLoading) {
    return memberRoutes.includes(pathname) && user == null
       ? <AuthModal />
       : <>{children}</>
  }

  if (memberRoutes.includes(pathname) && !userLoading && user != null) {
    return <>{children}</>
  }

  return <AppLoading />
}
