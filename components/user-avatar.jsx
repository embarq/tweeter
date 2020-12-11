import { useState } from 'react'
import classNames from 'classnames'
import { smile as smileIcon } from '../util/icons'
import { getCloudinaryUrl } from '../util/misc'

export default function UserAvatar({ avatarId = null, className = '' }) {
  const [loadFilure, setLoadFilure] = useState(false)

  if (typeof avatarId !== 'string' || loadFilure) return (
    <div className="w-10 h-10 rounded-lg text-gray-400">{smileIcon}</div>
  )

  return (
    <img src={getCloudinaryUrl(avatarId)} alt="Avatar"
      className={classNames('w-10 h-10 rounded-lg', className)}
      onError={() => setLoadFilure(true)} />
  )
}
