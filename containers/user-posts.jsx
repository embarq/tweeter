import { useState, useEffect } from 'react'
import { watchUserPosts } from '../core/posts'
import { useLoading } from '../core/hooks'

export default function UserPosts({ author, posts: initialPostsPayload, children }) {
  const [posts, setPosts] = useState(initialPostsPayload)
  const [loadingState, setLoadingState] = useLoading()

  useEffect(() => {
    const cancelWatcher = watchUserPosts(author,
      (_posts) => {
        setPosts(_posts)
        setLoadingState({ loading: false, success: true })
      },
      (err) => {
        setLoadingState({ loading: false, error: err.message })
      }
    )

    return () => cancelWatcher()
  }, [])

  return children({ posts, loadingState })
}
