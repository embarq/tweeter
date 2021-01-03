import { useState } from 'react'
import Portal from '../components/portal'
import Modal from '../components/modal'
import Auth from '../components/auth-page'

export default function AuthModal({ onDismiss }) {
  const [display, setDisplay] = useState(true)

  if (!display) {
    if (onDismiss instanceof Function) {
      onDismiss()
    }
    return null
  }

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
