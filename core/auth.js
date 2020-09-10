import fire from 'firebase'

export const signupWithCredentials = (payload) => {
  return fire.auth()
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
      return fire.firestore().collection('users').add(userProfile)
    })
}
