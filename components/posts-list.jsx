import classNames from 'classnames'
import Post from './post'

export default function PostsList({ className = '', posts = [] }) {
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
