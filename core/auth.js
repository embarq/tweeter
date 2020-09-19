// @ts-check
import firebase from 'firebase'

export const signupWithCredentials = (payload) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(
      payload.email,
      payload.password
    )
    .then(res => {
      const userProfile = {
        ...payload,
        id: res.user.uid
      }
      delete userProfile.password
      return firebase.firestore().collection('users').add(userProfile)
    })
}

export const getProfile = (uid) => {
  return firebase
    .firestore()
    .collection('users')
    .where('id', '==', uid)
    .get()
    .then(snap => {
      if (snap.size > 0) {
        return snap.docs[0].data()
      }

      throw new Error(`User ${uid} not found`)
    })

}
