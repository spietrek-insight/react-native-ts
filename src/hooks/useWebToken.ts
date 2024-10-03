// create a react hook named useWebToken, it should accept a string named webToken
// the hook sould also have 2 event paramters (generate webToken and isTokenExpired)
// the hook should have a method name createNewWebToken that calls the createWebToken function in the utils/webToken.ts file
// the hook shoudl check ever 2 minutes to determine if the token has expired
// if the token has expired, the isTokenExpired event should be called
// when the user logins in, the generateWebToken event should be called, and the createNewWebToken method should be called
// the internal webToken state should be updated with the new token

// Path: src/hooks/useWebToken.ts

import { useEffect } from 'react'

import { checkTokenExpiration } from '@/utils/webToken'

export const useWebToken = (
  webToken: string | null | undefined,
  isTokenExpired: () => void,
) => {
  // create a useEfect that checks every 2 minutes if the token has expired
  // if it has, it will call the isTokenExpired event
  useEffect(() => {
    if (!webToken) {
      isTokenExpired()
    }

    const interval = setInterval(() => {
      if (webToken && checkTokenExpiration(webToken)) {
        isTokenExpired()
      }
    }, 120000)

    return () => clearInterval(interval)
  }, [webToken, isTokenExpired])

  return null
}
