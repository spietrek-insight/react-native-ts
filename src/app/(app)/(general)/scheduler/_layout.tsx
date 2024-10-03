import { StyleSheet, View } from 'react-native'

import { Slot } from 'expo-router'

export default function SchedulerLayout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 16,
    width: '100%',
  },
})
