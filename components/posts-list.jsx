import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { getPosts } from '../core/posts'
import { useLoading } from '../core/hooks'
import Post from './post'

export default function PostsList({ className, author }) {
  const [posts, setPosts] = useState([])
  const [loadingState, setLoadingState] = useLoading()

  useEffect(() => {
    setLoadingState({ loading: true })

    const cancelWatcher = getPosts(author,
      (posts) => {
        setPosts(posts)
        setLoadingState({ loading: false, success: true })
      },
      (err) => { setLoadingState({ loading: false, error: err.message }) }
    )

    return () => cancelWatcher()
  }, [])

  return (
    <ul className={classNames('list-none', className)}>{
      posts.map(post => (
        <li key={post.id} className="mb-6">
          <Post data={post} />
        </li>
      ))
    }</ul>
  )
}
