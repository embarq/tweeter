// @ts-check
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import * as state from '../constants/state'
import * as firebase from 'firebase/app'
import { useCookies } from 'react-cookie'
import * as cookiesKeys from '../constants/cookies'

export default function AuthContainer({children}) {
  const setUserId = useSetRecoilState(state.userId)
  const setUserProfile = useSetRecoilState(state.userProfile)
  const setUserLoading = useSetRecoilState(state.userLoading)
  const [, setCookie] = useCookies()

  useEffect(() => {
    const tokenChangeUnsubscriber = firebase.auth().onIdTokenChanged(async user => {
      if (user) {
        let token = await user.getIdToken()
        setCookie(cookiesKeys.AuthKey, token)
      } else {
        setCookie(cookiesKeys.AuthKey, '')
      }
    })
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { uid } = user
          const snap = await firebase.firestore()
            .collection('users')
            .where('id', '==', uid)
            .get()

          let profile = snap.docs[0].data()

          if (profile == null) {
            throw new Error('User profile not found')
          }

          setUserProfile(profile)
          setUserId(uid)
        } else {
          setUserProfile(null)
          setUserId(null)
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.error(error);
      } finally {
        setUserLoading(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => {
      unsubscriber()
      tokenChangeUnsubscriber()
    }
  }, [])

  return <>{children}</>
}
