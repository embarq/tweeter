import classNames from 'classnames'
import Loader from './loader'

const defaultStyles = 'flex items-center shadow bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded'
const clearStyles = 'text-gray-600 hover:text-gray-700 hover:bg-gray-100 focus:shadow-outline focus:outline-none py-2 px-4 rounded'

export default function Button({className, children, kind, loading, ...props}) {
  const buttonStyle = kind === 'clear' ? clearStyles : defaultStyles
  return (
    <button {...props} className={classNames(buttonStyle, className)}>
      {loading && <div className="w-4 h-4 mr-2"><Loader /></div>}
      {children}
    </button>
  )
}
