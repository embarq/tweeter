import { useEffect } from 'react'
import classNames from 'classnames'
import MePageNav from './me-page-nav'
import * as firebase from 'firebase/app'
import Button from './button'

export default function HeaderNavPopover({ onDismiss, className = '' }) {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => onDismiss())
      .catch(() => onDismiss())
  }

  useEffect(() => {
    if (document == null) {
      return
    }

    const handler = e => {
      if (e.target.closest('#header-nav-popover') == null) {
        e.stopPropagation()
        onDismiss()
      }
    }

    document.body.addEventListener('click', handler)
    return () => document.body.removeEventListener('click', handler)
  }, [])

  return (
    <div
      className={classNames('fixed top-0 right-0 mt-16 w-full md:w-56 md:mt-20 md:mr-3 shadow-lg bg-white rounded-lg p-3', className)}
      id="header-nav-popover">
      <ul className="list-none">
        <li>
          <MePageNav />
        </li>
        <hr/>
        <li>
          <Button
            onClick={handleLogout}
            kind="clear"
            className="justify-start w-full text-red-500 hover:text-red-400">
            Logout
          </Button>
        </li>
      </ul>
    </div>
  )
}
