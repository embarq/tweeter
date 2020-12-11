import { useCurrentUserId } from '../core/hooks'
import Layout from '../components/layout'
import NewPostForm from '../components/new-post-form'
import Trends from '../components/trends'
import PostsList from '../components/posts-list'
import Cookies from 'universal-cookie'
import * as admin from 'firebase-admin'
import { verifyIdToken } from '../core/auth-server'
import * as cookiesKey from '../constants/cookies'

export default function IndexPage({ posts }) {
  const currentUser = useCurrentUserId()
  return (
    <Layout>
      <div className="container mx-auto md:pt-6 md:flex">
        <div className="w-full md:w-2/3 px-4">
          <NewPostForm />
          <PostsList posts={posts} author={currentUser} className="mt-6" />
        </div>
        <div className="hidden md:block w-1/3 px-4">
          <Trends />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  try {
    const cookies = new Cookies(ctx.req.headers.cookie)
    let token = await verifyIdToken(cookies.get(cookiesKey.AuthKey))
    let posts = await admin.firestore()
      .collection('posts')
      .where('author', '==', token.uid)
      .get()
      .then(snap => snap.docs.map(doc => ({ ...doc.data(), id: doc.id })))

    return {
      props: {
        posts
      }
    }
  } catch(err) {
    console.error(err)
    return {
      props: {
        posts: []
      }
    }
  }
}
