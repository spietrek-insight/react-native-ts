import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'

export const useWebIdle = (
  delay: number = 10 * 60 * 1000,
  onInactive: () => void,
): void => {
  const inactivityInterval = delay // 10 minutes in milliseconds'
  const [lastActiveTime, setLastActiveTime] = useState<number>(Date.now())
  const [isInactive, setIsInactive] = useState<boolean>(false)

  const goInactive = useCallback(() => {
    if (isInactive) return

    setIsInactive(true)

    onInactive()
  }, [isInactive, onInactive])

  useEffect(() => {
    if (Platform.OS !== 'web') return

    // Event handler to update last active time
    const handleActive = () => {
      setIsInactive(false)
      setLastActiveTime(Date.now())
    }

    // Setup event listener for user activity
    const events = [
      'mousedown',
      'keypress',
      'mousewheel',
      'touchmove',
      'MSPointerMove',
      'blur',
      'focus',
    ]

    events.forEach(event => {
      window.addEventListener(event, handleActive)
    })

    // Interval to check for inactivity every 5 seconds
    const interval = setInterval(() => {
      console.log(
        'webInterval',
        Date.now() - lastActiveTime,
        inactivityInterval,
      )
      if (Date.now() - lastActiveTime > inactivityInterval) {
        goInactive()
      }
    }, 5000) // Check every 5 seconds

    // Cleanup function
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActive)
      })
      clearInterval(interval) // Clear the interval on cleanup
    }
  }, [goInactive, inactivityInterval, lastActiveTime])
}
