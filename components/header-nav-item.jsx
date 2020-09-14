import Link from 'next/link'
import classNames from 'classnames'

export default function HeaderNavItem({ text, link, isActive, isLast }) {
  const linkContainerStyles = classNames(
    'w-20 text-sm text-center border-b-4 border-transparent hover:border-indigo-400 transition-colors',
    isActive && 'border-indigo-600',
    !isLast && 'mr-8'
  )
  const linkStyles = classNames(
    'block py-5 text-gray-600 font-semibold hover:text-indigo-400 transition-colors',
    isActive && 'text-indigo-500'
  )
  return (
    <li className={linkContainerStyles}>
      <Link href={link}>
        <a className={linkStyles}>{text}</a>
      </Link>
    </li>
  )
}
