import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import AuthModal from '../components/auth-modal'
import * as state from '../constants/state'

const memberRoutes = [
  '/',  // TODO: will be landing page, remove later
  '/home',
  '/me',
  '/bookmarks',
  '/messages'
]

export default function RouingContainer({ children }) {
  const { pathname } = useRouter()
  const userLoading = useRecoilValue(state.userLoading)
  const user = useRecoilValue(state.userId)

  if (user == null && userLoading) {
    return null;
  }

  if (memberRoutes.includes(pathname) && !userLoading && user != null) {
    return <>{children}</>
  }

  return <AuthModal />
}
