import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { watchUserPosts } from '../core/posts'
import { useLoading } from '../core/hooks'
import Post from './post'

export default function PostsList({ className, author, posts: _posts = [] }) {
  const [posts, setPosts] = useState(_posts)
  // TODO: display loading strip on top or bottom of the list
  const [loadingState, setLoadingState] = useLoading()

  useEffect(() => {
    setLoadingState({ loading: true })

    const cancelWatcher = watchUserPosts(author,
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
      _posts.map(post => (
        <li key={post.id} className="mb-6">
          <Post data={post} />
        </li>
      ))
    }</ul>
  )
}
