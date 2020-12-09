// @ts-check

import { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'
import { getProfile } from './auth'
import { getCloudinaryUrl } from '../util/misc'

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
      .then(profile =>
        setAuthor({
          ...profile,
          avatar: { url: getCloudinaryUrl(profile.avatar) }
        })
      )
      .catch(console.error)
  }, [])

  return author
}

export const usePostDetails = (post) => {
  // TODO: attachments, stats(likes, retweets, replies, saves/bookmarks)
  const author = usePostAuthor(post.author)
  const attachments = Array.isArray(post.attachments) && post.attachments.map(entryId => {
    return {
      id: entryId,
      link: getCloudinaryUrl(entryId)
    }
  })

  return { author, attachments }
}
