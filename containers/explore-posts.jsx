import { useState } from 'react'

export default function ExplorePosts({ posts: initialPostsPayload = [], children }) {
  const [posts, setPosts] = useState(initialPostsPayload)

  return children({ posts })
}
