// @ts-check
import * as firebase from 'firebase/app'

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

export const login = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const getCurrentUid = () => {
  return firebase.auth().currentUser.uid
}

export const getProfileSnapshot = (uid) => {
  return firebase
    .firestore()
    .collection('users')
    .where('id', '==', uid)
    .get()
}

export const getProfile = (uid) => {
  return getProfileSnapshot(uid)
    .then(snap => {
      if (snap.size > 0) {
        return snap.docs[0].data()
      }

      throw new Error(`User ${uid} not found`)
    })
}

export const updateProfile = (uid, payload) => {
  return getProfileSnapshot(uid)
    .then(snap => {
      if (snap.size > 0) {
        return snap.docs[0].ref.update(payload)
      }

      throw new Error(`User ${uid} not found`)
    })
}
