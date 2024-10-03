import { StateCreator } from 'zustand'

export interface User {
  id: string
  name: string
}

export interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const userStore: StateCreator<UserState> = set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
})
