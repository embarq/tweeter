export default function Modal({ children, onDismiss, title }) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div className="inline-block w-full align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          {typeof title === 'string' &&
            <header className="relative">
              <h2 className="mt-6 text-center text-gray-500 text-xl">{title}</h2>
              <button onClick={onDismiss} type="button" className="absolute top-0 right-0 h-full rounded-bl-md rounded-tl-md px-5 text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-600">&times;</button>
            </header>
          }
          {children}
        </div>
      </div>
    </div>
  )
}
