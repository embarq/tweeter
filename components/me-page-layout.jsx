import { Children } from 'react'
import MePageNav from './me-page-nav'
import { myPagesLinks } from '../constants/ui'

export default function MePageLayout({ children }) {
  return (
    <div className="container mx-auto pt-6 flex h-full">
      <div className="w-1/4 px-4">
        <div className="p-4 w-3/4">
          <MePageNav links={myPagesLinks} />
        </div>
      </div>
      <div className="w-3/4">
        <div className="card h-full">
          {Children.only(children)}
        </div>
      </div>
    </div>
  )
}
