import Link from 'next/link'
import classNames from 'classnames'

export default function HeaderNavItem({ text, link, isActive, isLast, disabled = false }) {
  const linkContainerStyles = classNames(
    'w-20 text-sm text-center border-b-4 border-transparent',
    isActive && 'border-indigo-600',
    !isLast && 'mr-8',
    !disabled && 'hover:border-indigo-400 transition-colors',
  )
  const linkStyles = classNames(
    'block py-5 text-gray-600 font-semibold',
    isActive && 'text-indigo-500',
    !disabled && 'hover:text-indigo-400 transition-colors'
  )

  return (
    <li className={linkContainerStyles}>{
      disabled
        ? <span className={linkStyles}>{text}</span>
        : (
          <Link href={link}>
            <a className={linkStyles}>{text}</a>
          </Link>
        )
    }</li>
  )
}
