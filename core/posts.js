import firebase from './firebase'

export const getPosts = (uid, onNext, onError) => {
  return firebase
    .firestore()
    .collection('posts')
    .where('author', '==', uid)
    // .orderBy('created_at', 'asc')
    .onSnapshot(({
      next: function handleNext(snap) {
        onNext(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      },
      error: onError
    }))
}

export const getOwnPosts = (onNext, onError) => {
  const uid = firebase.auth().currentUser.uid
  return getPosts(uid, onNext, onError)
}

