import { View, StyleSheet } from 'react-native'

import { WinkAppointmentCard } from './WinkAppointmentCard'

import { Appointment } from '@/interfaces/appointment'

type Props = {
  appointments: Appointment[]
  onPress?: (id: string) => void
}

export const WinkAppointmentCards = ({ appointments, onPress }: Props) => {
  return (
    <View
      id="AppointmentCards"
      testID="AppointmentCards"
      style={styles.container}
    >
      {appointments.map(appointment => (
        <WinkAppointmentCard
          appointment={appointment}
          key={appointment.id}
          onPress={() => onPress?.(appointment.id)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
})
