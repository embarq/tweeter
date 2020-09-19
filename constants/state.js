import { selector } from 'recoil'
import { atomFactory } from '../util/misc'

const createAuth = atomFactory('auth')

export const userId = createAuth('uid')

export const userProfile = createAuth('userProfile', {})

export const userLoading = createAuth('userLoading', true)

export const displayAuthModal = createAuth('displayAuthModal', false)

export const isAuthenticated = selector({
  key: 'auth_isAuthenticated',
  get: ({ get }) => {
    const user = get(userId)
    const loading = get(userLoading)
    return user && !loading
  }
})

export const currentUser = selector({
  key: 'currentUser',
  get: ({ get }) => get(userId)
})
