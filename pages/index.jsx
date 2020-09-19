import { useCurrentUserId } from '../core/hooks'
import Layout from '../components/layout'
import NewPostForm from '../components/new-post-form'
import Trends from '../components/trends'
import PostsList from '../components/posts-list'

export default function IndexPage() {
  const currentUser = useCurrentUserId()
  return (
    <Layout>
      <div className="container mx-auto pt-6 flex">
        <div className="w-2/3 px-4">
          <NewPostForm />
          <PostsList author={currentUser} className="mt-6" />
        </div>
        <div className="w-1/3 px-4">
          <Trends />
        </div>
      </div>
    </Layout>
  )
}
