import { useState, useEffect } from 'react'
import { useUser } from '../core/user.context'
import Portal from '../components/portal'
import Modal from '../components/modal'
import Auth from '../components/auth'

export default function AuthModal() {
  const [display, setDisplay] = useState(false)
  const {user, loadingUser} = useUser()

  useEffect(() => {
    if (!loadingUser && user == null) {
      setDisplay(true)
    }
  }, [user, display])

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
