import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { WinkLockScreen } from './WinkLockScreen'

type LockScreenModalProps = {
  onGoActive: () => void
  onSignOut: () => void
}

export const WinkLockScreenModal = ({
  onGoActive,
  onSignOut,
}: LockScreenModalProps) => {
  const translateY = useSharedValue(300) // Start below the screen

  useEffect(() => {
    runOnUI(() => {
      'worklet'
      translateY.value = withTiming(0, { duration: 500 })
    })()
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  return (
    <Portal>
      <Dialog
        visible
        dismissable={false}
        style={styles.dialog}
        testID="LockScreenModal"
      >
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          <WinkLockScreen onGoActive={onGoActive} onSignOut={onSignOut} />
        </Animated.View>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    position: 'absolute',
    borderRadius: 0,
    top: 20,
    left: 0,
    right: 0,
    bottom: 20,
    margin: 0,
    backgroundColor: 'transparent', // Ensuring Dialog doesn't interfere visually
  },
  animatedContainer: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
})
