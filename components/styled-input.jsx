import { cloneElement, Children } from 'react'

const defaultStyles = 'bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-400'

/**
 *
 * @example
 * ```jsx
 * <StyledInput>
 *   <input id="inline-full-name" type="text" className="text-center" />
 * </StyledInput>
 * ```
 */
export default function StyledInput({ children, className, ...props }) {
  const child = Children.only(children)
  const childClassName = child.props.className || ''
  return cloneElement(child, {
    ...props,
    className: defaultStyles + ' ' + childClassName
  })
}
