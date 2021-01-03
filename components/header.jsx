import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import classNames from 'classnames'
import HeaderNavItem from './header-nav-item'
import Button from './button'
import * as state from '../constants/state'
import HeaderNavPopover from './header-nav-popover'
import { logo as logoIcon } from '../util/icons'
import UserAvatar from './user-avatar'

const LINKS = [
  { link: '/', text: 'Home' },
  { link: '/explore', text: 'Explore' },
  { link: '/bookmarks', text: 'Bookmarks', disabled: true },
  { link: '/messages', text: 'Messages', disabled: true }
]

export default function Header() {
  const [showNavPopover, setShowNavPopover] = useState(false)
  const { pathname } = useRouter()
  const user = useRecoilValue(state.userProfile)
  const links = LINKS.map((link, i, arr) => (
    <HeaderNavItem
      key={link.text}
      isActive={link.link === pathname}
      isLast={i === arr.length - 1}
      {...link} />
  ));

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm">
      <div className="container relative mx-auto h-16 flex items-center justify-between px-4 md:px-0">
        <Link href="/">
          <a className="flex align-center text-indigo-500">
            {logoIcon}
            <span className="ml-3 pt-1 font-bold">Tweeter</span>
          </a>
        </Link>
        <nav className="hidden md:flex list-none">
          {links}
        </nav>
        <div className="md:flex md:justify-end md:w-48 h-full">
        	<Button
        	  onClick={() => setShowNavPopover(true)}
        	  className="flex justify-end h-full px-2 border-b-4 border-transparent focus:shadow-none"
        	  kind="clear">
        	  <UserAvatar avatarId={user.avatar} className="mr-3 md:mx-0" />
        	  <div className="hidden md:inline ml-3 mx-2 text-indigo-400 text-right text-xs font-bold">{user && user.fullname}</div>
        	  <svg
        	    width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        	    className={classNames('transform transition-transform duration-100', { 'rotate-180': showNavPopover })}>
        	    <path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" />
        	  </svg>
        	</Button>
        </div>
      </div>
      {showNavPopover &&
        <HeaderNavPopover onDismiss={() => setShowNavPopover(false)} />
      }
    </header>
  )
}
