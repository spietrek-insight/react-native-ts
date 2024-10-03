import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Appointment } from '@/interfaces/appointment'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

type Props = {
  appointment: Appointment
  onPress?: (id: string) => void
}

export const WinkAppointmentCard = ({ appointment, onPress }: Props) => {
  const handlePress = () => {
    if (onPress) {
      onPress(appointment.id)
    }
  }

  const apptTime = appointment.date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <TouchableOpacity
      id="AppointmentCard"
      testID="AppointmentCard"
      style={styles.button}
      onPress={handlePress}
    >
      <View style={styles.cardContainer}>
        <View style={styles.firstColumn}>
          <View style={styles.statusColumn1}>
            <FontAwesome name="square" size={14} color="black" />
          </View>
          <View style={styles.statusColumn2}>
            <View style={styles.statusContainer}>
              <FontAwesome
                name={
                  appointment.statusCodeIcon as keyof typeof FontAwesome.glyphMap
                }
                size={14}
                color="black"
              />
              <FontAwesome5 name="redo" size={12} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.secondColumn}>
          <View style={styles.row}>
            <Text style={styles.textLeft}>{apptTime}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>{appointment.visitType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>
              {appointment.fullName} ({appointment.gender}){' '}
              {appointment.dateOfBirth.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textLeft}>{appointment.doctorName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstColumn: {
    flexDirection: 'row',
    width: 40,
  },
  statusColumn1: {
    width: 18,
  },
  statusColumn2: {
    width: 18,
  },
  secondColumn: {
    flex: 1,
    marginLeft: 8,
  },
  button: {
    minHeight: 90,
    width: 220,
    borderRadius: 10, // 'rounded-lg' typically equals a borderRadius of about 10
    backgroundColor: '#F2C2B7',
    padding: 8, // Adjusted from 'p-2' for scale
    borderWidth: 0, // 'border-none'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4, // Adjusted from 'pb-1' for scale
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: 16,
    marginLeft: 4,
    gap: 4,
  },
  textLeft: {
    textAlign: 'left',
    fontSize: 12, // 'text-xs' converted to approximate React Native size
  },
})
