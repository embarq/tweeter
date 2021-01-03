import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
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
  const [displayAuthModal, setDisplayAuthModal] = useRecoilState(state.displayAuthModal)
  const content = []

  if (!userLoading) {
    if (
      !memberRoutes.includes(pathname) ||
      (memberRoutes.includes(pathname) && user != null)
    ) {
      content.push(children)

      if (displayAuthModal) {
        content.push(
          <AuthModal key="auth_modal" onDismiss={() => setDisplayAuthModal(false)} />
        )
      }
    } else {
      return <AuthModal />
    }

    return content
  }

  return <AppLoading />
}
