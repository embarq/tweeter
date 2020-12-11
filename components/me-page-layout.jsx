import MePageNav from './me-page-nav'
import { myPagesLinks } from '../constants/ui'

export default function MePageLayout({ children }) {
  return (
    <div className="container mx-auto md:pt-6 md:flex h-full px-4 md:px-0">
      <div className="hidden md:block w-1/4 px-4">
        <div className="p-4 w-3/4">
          <MePageNav links={myPagesLinks} />
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <div className="card h-full">
          {children}
        </div>
      </div>
    </div>
  )
}
