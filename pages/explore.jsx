// @ts-check
import Cookies from 'universal-cookie'
import * as admin from 'firebase-admin'
import { verifyIdToken } from '../core/auth-server'
import * as cookiesKey from '../constants/cookies'
import Layout from "../components/layout"
import ExplorePosts from "../containers/explore-posts"
import PostsFilters from "../components/posts-filters"
import PostsList from '../components/posts-list'

export default function ExplorePage({ posts }) {
  const handleFiltersChange = filterKey => {
    console.log('[handleFiltersChange]', filterKey)
  }
  return (
    <Layout>
      <div className="container mx-auto md:pt-6 md:flex">
        <div className="w-full md:w-2/3 px-4">
          <ExplorePosts posts={posts}>{
            ({ posts }) => (
              <PostsList posts={posts} />
            )
          }</ExplorePosts>
        </div>
        <aside className="hidden md:block w-1/3 px-4">
          <article className="card">
            <PostsFilters selectedFilter="tweets" onSelect={handleFiltersChange} />
          </article>
        </aside>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  await verifyIdToken(null)

  let posts = await admin.firestore()
    .collection('posts')
    .get()
    .then(snap => snap.docs.map(doc => ({ ...doc.data(), id: doc.id })))

  return {
    props: {
      posts
    }
  }
}
