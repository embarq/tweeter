// @ts-check
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import * as state from '../constants/state'
import fire from '../core/firebase'

export default function AuthContainer({children}) {
  const setUserId = useSetRecoilState(state.userId)
  const setUserProfile = useSetRecoilState(state.userProfile)
  const setUserLoading = useSetRecoilState(state.userLoading)

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = fire.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { uid } = user
          const snap = await fire.firestore()
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
    return () => unsubscriber()
  }, [])

  return <>{children}</>
}
