import { useRouter } from 'next/router'
import Link from 'next/link'
import { myPagesLinks } from '../constants/ui'
import Button from './button'

export default function MePageNav({ }) {
  const {asPath} = useRouter()

  return (
    <ul className="list-none">{
    myPagesLinks.map(({ link, text }) => (
      <li key={link}>
        <Link href={link}>
          <a>
            <Button kind={link === asPath ? 'primary' : 'clear'} className="w-full justify-start">{text}</Button>
          </a>
        </Link>
      </li>
    ))}</ul>
  )
}
