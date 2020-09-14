import { useState, useEffect } from 'react'
import Link from 'next/link'
import fire from '../core/firebase'
import Button from './button'

export default function HeaderNavPopover({ onDismiss }) {
  const handleLogout = () => fire.auth().signOut().then(() => onDismiss())

  useEffect(() => {
    if (document == null) {
      return
    }

    const handler = e => {
      if (e.target.closest('#header-nav-popover') == null) {
        onDismiss()
      }
    }

    document.body.addEventListener('click', handler)
    return () => document.body.removeEventListener('click', handler)
  }, [])

  return (
    <div
      className="fixed top-0 right-0 w-56 mt-20 mr-3 shadow-lg bg-white rounded-lg p-3"
      id="header-nav-popover">
      <ul className="list-none">
        <li>
          <Link href="/me">
            <a className="text-gray-700">
              <Button kind="clear" className="text-left w-full">
                My Profile
              </Button>
            </a>
          </Link>
        </li>
        <hr/>
        <li>
          <Button
            onClick={handleLogout}
            kind="clear"
            className="text-left w-full text-red-500 hover:text-red-400">
            Logout
          </Button>
        </li>
      </ul>
    </div>
  )
}
