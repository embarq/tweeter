import { useRef, useState } from 'react'
import classNames from 'classnames'

const preventDefaultAndPropagation = event => {
  event.preventDefault()
  event.stopPropagation()
}

export default function FileUpload({
  children,
  id,
  className,
  activeClassName,
  onChange,
  onActiveChange = () => {},
  fileInputAttributes
}) {
  const fileInputRef = useRef()
  const [active, setActive] = useState(false)

  const handleAreaClick = (event) => {
    fileInputRef.current.click()
  }

  const handleDragIn = (event) => {
    preventDefaultAndPropagation(event)
    setActive(true)
    onActiveChange(true)
  }

  const handleDragOut = (event) => {
    preventDefaultAndPropagation(event)
    setActive(false)
    onActiveChange(false)
  }

  const handleDrop = (event) => {
    preventDefaultAndPropagation(event)
    onChange(event.dataTransfer.files)
    setActive(false)
    onActiveChange(false)
  }

  return (
    <button type="button"
      className={classNames('dnd-host', className, { [activeClassName]: active })}
      onClick={handleAreaClick}
      onDrop={handleDrop}
      onDragOver={handleDragIn}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragEnd={handleDragOut}
      onDragExit={handleDragOut}>
      {children}
      <input
        id={id}
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={onChange}
        {...fileInputAttributes} />
    </button>
  )
}
