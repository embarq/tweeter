import classNames from 'classnames'
import Loader from './loader'

const ButtonStyles = {
  primary: 'btn hover:bg-indigo-500 focus:shadow-outline focus:outline-none',
  clear: 'btn-clear hover:text-gray-700 hover:bg-gray-100 focus:shadow-outline focus:outline-none',
}

export default function Button({className, children, kind = 'primary', loading, ...props}) {
  return (
    <button {...props} className={classNames(ButtonStyles[kind], className)} disabled={loading}>
      {loading && <div className="w-4 h-4 mr-2"><Loader /></div>}
      {children}
    </button>
  )
}
