import { Text, View } from 'react-native'

import { useLocalSearchParams } from 'expo-router'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function AppointmentScreen() {
  const { id } = useLocalSearchParams()
  useDocumentTitle('Appointment')

  return (
    <View id="AppointmentScreen">
      <Text>Appointment {id} </Text>
    </View>
  )
}
