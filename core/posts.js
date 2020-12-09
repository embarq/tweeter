import * as firebase from 'firebase/app'

export const createPost = (payload) => {
  return firebase.firestore().collection('posts').add(payload)
}

export const getPostsByAuthor = (uid) => {
  return firebase
    .firestore()
    .collection('posts')
    .where('author', '==', uid)
}

export const getUserPosts = (uid) => {
  return getPostsByAuthor(uid).get()
    .then(snap => snap.docs.map(doc => doc.data()))
}

export const watchUserPosts = (uid, onNext, onError) => {
  return getPostsByAuthor(uid).onSnapshot(({
    next: function handleNext(snap) {
      onNext(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    },
    error: onError
  }))
}
