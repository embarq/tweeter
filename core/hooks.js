// @ts-check

import { useEffect, useState } from 'react'
import firebase from './firebase'
import { getProfile } from './auth'

/**
 * @example
 * const [{ loading, success, error }, setLoadingState] = useLoading()
 */
export const useLoading = () => {
  const [state, setState] = useState({ loading: false, success: false, error: null })
  return [state, setState]
}

export const useCurrentUserId = () => {
  return firebase.auth().currentUser.uid
}

export const usePostAuthor = uid => {
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    getProfile(uid)
      .then(profile => setAuthor(profile))
      .catch(console.error)
  }, [])

  return author
}

export const usePostDetails = (post) => {
  // TODO: attachments, stats(likes, retweets, replies, saves/bookmarks)
  const author = usePostAuthor(post.author)
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const attachments = Array.isArray(post.attachments) && post.attachments.map(entryId => {
    return {
      id: entryId,
      link: `https://res.cloudinary.com/${cloudName}/image/upload/${entryId}`
    }
  })

  return { author, attachments }
}
