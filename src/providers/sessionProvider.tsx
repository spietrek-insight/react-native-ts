import { createContext, useContext } from 'react'

import { useRouter } from 'expo-router'

import { WinkLockScreenModal } from '@/components/organisms/WinkLockScreenModal'
import { useStorageObjectState } from '@/hooks/useStorageObjectState'
import { useWebToken } from '@/hooks/useWebToken'
import { createWebToken } from '@/utils/webToken'

type Session = {
  userName: string | null
  active: string | null
  webToken: string | null
}

type AuthContextType = {
  signIn: () => void
  signOut: () => void
  goActive: () => void
  goInactive: () => void
  isActive: boolean
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  goActive: () => null,
  goInactive: () => null,
  isActive: false,
  isLoggedIn: false,
})

// This hook can be used to access the user info.
// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(AuthContext)

interface SessionProviderProps {
  children: React.ReactNode
}

// MARK: - SessionProvider
export const SessionProvider = ({ children }: SessionProviderProps) => {
  const router = useRouter()
  const [session, setSession] = useStorageObjectState<Session | null>('session')

  useWebToken(session?.webToken, () => {
    if (session === null) return
    signOut()
  })

  const signIn = () => {
    setSession({
      userName: 'xxx',
      active: 'y',
      webToken: createWebToken('xxx'),
    })
    router.replace('/')
  }

  const signOut = () => {
    setSession(null)
    router.replace('/(app)/(aux)/login')
  }

  const goActive = () => {
    setSession({
      ...(session as Session),
      active: 'y',
    })
  }

  const goInactive = () => {
    if (session === null) return
    setSession({
      ...(session as Session),
      active: 'n',
    })
  }

  if (children === null) {
    return null
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line sonarjs/jsx-no-constructed-context-values
      value={{
        signIn,
        signOut,
        goActive,
        goInactive,
        isActive: session?.active === 'y',
        isLoggedIn: session !== null,
      }}
    >
      {children}
      {session !== null && session.active !== 'y' && (
        <WinkLockScreenModal onGoActive={goActive} onSignOut={signOut} />
      )}
    </AuthContext.Provider>
  )
}
