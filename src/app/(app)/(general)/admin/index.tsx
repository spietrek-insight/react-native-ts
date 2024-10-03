import { StyleSheet, View } from 'react-native'

import { Stack } from 'expo-router'

import { WinkAdminPage } from '@/components/pages/WinkAdminPage'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function AdminScreen() {
  useDocumentTitle('Admin')

  return (
    <View id="AdminScreen" style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Admin',
        }}
      />
      <WinkAdminPage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})
