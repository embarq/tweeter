import { useState, useEffect } from 'react'
import Portal from '../components/portal'
import Modal from '../components/modal'
import Auth from '../components/auth-page'
import { useRecoilValue } from 'recoil'
import * as state from '../constants/state'

export default function AuthModal() {
  const [display, setDisplay] = useState(false)
  const userId = useRecoilValue(state.userId)
  const userLoading = useRecoilValue(state.userLoading)
  const isAuthenticated = userId != null && !userLoading

  useEffect(() => {
    if (!isAuthenticated) {
      setDisplay(true)
    }
  }, [isAuthenticated])

  if (display) {
    return (
      <Portal>
        <Modal onDismiss={() => setDisplay(false)} title="Join us">
          <div className="bg-white px-4 pt-5 pb-4 sm:px-0 sm:pt-6 sm:pb-8 w-full">
            <Auth onComplete={() => setDisplay(false)} />
          </div>
        </Modal>
      </Portal>
    )
  }

  return null
}
