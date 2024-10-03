import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { Appointment } from '@/interfaces/appointment'

import { WinkAppointmentCards } from '../organisms/WinkAppointmentCards'

interface IProps {
  appointments: Appointment[]
  onNavigate: (route: string) => void
}

export const WinkHomePage = ({ appointments, onNavigate }: IProps) => {
  const handlePress = (id: string) => {
    const route: string = `/(app)/(general)/appointment/${id}`
    onNavigate(route)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Steve Pietrek</Text>
      <Text style={styles.subtitle}>Head Office Wake Forest</Text>
      <View style={styles.separator} />

      <ScrollView>
        <WinkAppointmentCards
          appointments={appointments}
          onPress={handlePress}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  title: {
    color: '#1DB3B3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  separator: {
    marginVertical: 8,
    height: 1,
    width: '80%',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: 350, // Fixed width for the left column
    marginRight: 8,
  },
  rightColumn: {
    flex: 1,
    padding: 8,
    marginLeft: 8,
  },
})
