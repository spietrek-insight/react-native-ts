/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { AppState, Platform } from 'react-native'

export const useIosIdle = (
  delay: number = 10 * 60 * 1000,
  onInactive: () => void,
) => {
  const inactivityInterval = delay // 10 minutes in milliseconds'
  const [lastActiveTime, setLastActiveTime] = useState<number>(Date.now())
  const [isInactive, setIsInactive] = useState<boolean>(false)

  const resetActivityTimer = useCallback(() => {
    setIsInactive(false)
    setLastActiveTime(Date.now())
  }, [])

  const goInactive = useCallback(() => {
    if (isInactive) return

    setIsInactive(true)

    onInactive()
  }, [isInactive, onInactive])

  const handleAppStateChange = useCallback(
    (nextAppState: string) => {
      if (nextAppState === 'active') {
        resetActivityTimer()
        return
      }
      goInactive()
    },
    [resetActivityTimer, goInactive],
  )

  const onGestureEvent = useCallback(() => {
    resetActivityTimer()
  }, [resetActivityTimer])

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return
    }

    const interval = setInterval(() => {
      console.log(
        'iosInterval',
        Date.now() - lastActiveTime,
        inactivityInterval,
      )
      if (Date.now() - lastActiveTime > inactivityInterval) {
        goInactive()
      }
    }, 5000) // Check every 5 seconds

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )

    return () => {
      subscription.remove()
      clearTimeout(interval)
    }
  }, [goInactive, handleAppStateChange, inactivityInterval, lastActiveTime])

  return { onGestureEvent }
}
