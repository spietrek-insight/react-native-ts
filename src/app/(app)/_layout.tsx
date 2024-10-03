import { useEffect, useState } from 'react'
import { PanResponder, StyleSheet, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { DELAY } from '@/constants/session'
import { useIosIdle } from '@/hooks/useIosIdle'
import { useWebIdle } from '@/hooks/useWebIdle'
import { useSession } from '@/providers/sessionProvider'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

void SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '(app)/index',
}

// eslint-disable-next-line complexity
export default function GeneralLayout() {
  const { goInactive } = useSession()
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  })

  useWebIdle(DELAY, () => {
    goInactive()
  })

  const { onGestureEvent } = useIosIdle(DELAY, () => {
    goInactive()
  })

  const [panResponder] = useState(
    PanResponder.create({
      // @ts-ignore
      onStartShouldSetPanResponderCapture: onGestureEvent,
    }),
  )

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
})
