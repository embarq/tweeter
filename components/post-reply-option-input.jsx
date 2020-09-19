import Button from './button'
import { profile, globe } from '../util/icons'
import classNames from 'classnames'

const options = [
  {
    label: 'Everyone',
    value: 'everyone',
    icon: globe
  },
  {
    label: 'People you follow',
    label: 'following',
    icon: profile
  }
]

export default function PostReplyOptionInput({ className }) {
  return (
    <div className={className}>
    </div>
  )
}

// PostReplyOptionInput.propTypes
