import classNames from 'classnames'
import Loader from './loader'

const defaultStyles = 'btn hover:bg-indigo-500 focus:shadow-outline focus:outline-none'
const clearStyles = 'btn-clear hover:text-gray-700 hover:bg-gray-100 focus:shadow-outline focus:outline-none'

export default function Button({className, children, kind, loading, ...props}) {
  const buttonStyle = kind === 'clear' ? clearStyles : defaultStyles
  return (
    <button {...props} className={classNames(buttonStyle, className)} disabled={loading}>
      {loading && <div className="w-4 h-4 mr-2"><Loader /></div>}
      {children}
    </button>
  )
}
