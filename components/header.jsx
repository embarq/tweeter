import { useRouter } from 'next/router'
import { useState } from 'react'
import HeaderNavItem from './header-nav-item'
import Button from './button'
import * as state from '../constants/state'
import HeaderNavPopover from './header-nav-popover'
import { useRecoilValue } from 'recoil'

const LINKS = [
  { link: '/', text: 'Home' },
  { link: '/bookmarks', text: 'Bookmarks' },
  { link: '/explore', text: 'Explore' },
  { link: '/messages', text: 'Messages' }
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
      <div className="container relative mx-auto flex items-center justify-between">
        <strong className="text-indigo-500">Tweeter</strong>
        <nav className="flex list-none pt-2">
          {links}
        </nav>
        <div className="noop"></div>
        <Button onClick={() => setShowNavPopover(true)} kind="clear" className="absolute right-0">
          <div className="text-indigo-400 mr-2 text-sm font-bold">{user && user.fullname}</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" /></svg>
        </Button>
      </div>
      {showNavPopover &&
        <HeaderNavPopover onDismiss={() => setShowNavPopover(false)} />
      }
    </header>
  )
}
