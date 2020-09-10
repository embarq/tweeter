import { useState, useEffect, createContext, useContext } from 'react'
import fire from './firebase'

export const UserContext = createContext()

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

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

          let profile = snap.docs[0]

          if (profile == null) {
            throw new Error('User profile not found')
          }

          setUser({ uid, profile })
        } else {
          setUser(null)
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.error(error);
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorhands the context!
export const useUser = () => useContext(UserContext)
