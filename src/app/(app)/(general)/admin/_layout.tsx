import { StyleSheet, View } from 'react-native'

import { Slot } from 'expo-router'

export default function AdminLayout() {
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
  },
})
