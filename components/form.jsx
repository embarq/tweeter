import React, { useEffect, useState, useRef } from "react"

export default function ManagedForm({
  children,
  onSubmit,
  initialValue = {},
  initialValueAsync = null,
  className
}) {
  const [value, setValue] = useState(initialValue)
  const [controls, setControlsState] = useState({})

  useEffect(() => {
    if (initialValueAsync instanceof Promise) {
      initialValueAsync.then((_value) => setValue(_value))
    }
  }, [initialValueAsync])

  useEffect(() => {
    let nextControlsState = Object.keys(value).reduce((accum, id) => {
      accum[id] = {
        value: value[id],
        dirty: value[id] != null
      }
      return accum
    }, {})
    setControlsState(nextControlsState)
  }, [value])

  const updateFieldState = (event) => {
    let target = event.currentTarget || event.target
    if (target) {
      return setValue({
        ...value,
        [target.id]: target.value
      })
    }

    if ("id" in event && "value" in event) {
      setValue({
        ...value,
        [event.id]: event.value
      })
    }
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
