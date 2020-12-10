import classNames from 'classnames'

export default function FormField({ children, label, labelFor, className }) {
  return (
    <div className={classNames('md:flex md:items-center mb-6', className)}>
      <div className="md:w-1/3">
        <label className="text-sm block text-gray-500 md:text-right mb-1 md:mb-0 pr-4 pl-2 md:pl-0" htmlFor={labelFor}>
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        {children}
      </div>
    </div>
  )
}
