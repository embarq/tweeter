import { useEffect, useState } from 'react'

export default function ManagedForm({ children, onSubmit, className }) {
  const [value, setValue] = useState({})
  const [controls, setControlsState] = useState({})

  useEffect(() => {
    let nextControlsState = Object.keys(value).reduce((accum, id) => {
      accum[id] = {
        value: value[id],
        dirty: value[id] != null,
      }
      return accum
    }, {})
    setControlsState(nextControlsState)
  }, [value])

  const updateFieldState = (event) => {
    setValue({
      ...value,
      [event.target.id]: event.target.value,
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(value, event)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children({ value, controls }, updateFieldState)}
    </form>
  )
}
