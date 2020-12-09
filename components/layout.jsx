import Header from './header'

export default function Layout({ children }) {
  return (
    <div className="w-full h-full pt-20 bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 pb-10">
        {children}
      </main>
      <footer className="text-center py-12 text-gray-500 shadow-xl">
        2020 <a href="#" className="text-indigo-500">Tweeter</a> by <a href="https://embarq.dev" target="_blank" className="text-gray-600">embarq.dev</a>
      </footer>
    </div>
  )
}
