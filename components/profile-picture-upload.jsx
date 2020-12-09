import { useEffect, useState } from 'react'
import classNames from 'classnames'
import FileUpload from './file-upload'

export default function ProfilePictureUpload({ data = null, onChange = () => {} }) {
  const [avatar, setAvatar] = useState(null)

  const handleAvatarChange = (event) => {
    if (event.target.files.length > 0) {
      const payload = {
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      }
      setAvatar(payload)
      onChange(payload)
    }
  }

  useEffect(() => {
    setAvatar(data)
  }, [data])

  if (avatar) {
    const variants = [ '24', '10' ].map(size => (
      <img src={avatar.url} alt="Avatar" key={size}
        className={`block bg-gray-200 text-gray-200 mr-4 rounded-md shadow w-${size} h-${size}`} />
    ))
    return (
      <div className="flex items-end">
        {variants}
      </div>
    )
  }

  return (
    <FileUpload
      onChange={handleAvatarChange}
      fileInputAttributes={{ accept: 'image/*' }}
      className="file-upload-btn w-full h-32 hover:bg-indigo-100 hover:text-indigo-300"
      activeClassName="bg-indigo-100 text-indigo-300"
      id="profilePicture">
      <span className="w-full text-2xl text-center">Upload a photo</span>
    </FileUpload>
  )
}
