import Header from './header'

export default function Layout({ children }) {
  return (
    <div className="w-full h-full bg-gray-100">
      <Header />
      {children}
      <footer className="text-center py-12 text-gray-500">
        2020 <a href="#" className="text-indigo-500">Tweeter</a> by <a href="https://embarq.dev" target="_blank" className="text-gray-600">embarq.dev</a>
      </footer>
    </div>
  )
}
