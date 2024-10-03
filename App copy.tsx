import { StyleSheet, Text, View } from 'react-native'

import { registerRootComponent } from 'expo'

import Constants from 'expo-constants'

import Storybook from './.ondevice'

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

console.log(Constants)

if (__DEV__ && Constants.expoConfig?.extra?.storybookEnabled) {
  registerRootComponent(Storybook)
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
