import { StyleSheet, View } from 'react-native'

import { faker } from '@faker-js/faker'
import { Stack, useRouter } from 'expo-router'

import { WinkHomePage } from '@/components/pages/WinkHomePage'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Appointment, FontAwesomeIconNames } from '@/interfaces/appointment'

const randomDate = (): Date => {
  const date = new Date()
  date.setHours(Math.floor(Math.random() * 9) + 8)
  date.setMinutes(Math.floor(Math.random() * 2) * 30)

  return date
}

const randomVisitType = (): string => {
  const visitTypes = [
    'Comprehensive exam',
    'Medical ER',
    'Follow up',
    'Visual field',
    'CL fitting',
    'CL follow up',
    'Pediatric',
    'Toulch scan',
  ]

  return visitTypes[Math.floor(Math.random() * visitTypes.length)]
}

const randomDoctor = (): string => {
  const doctors = [
    'Dr. Darth Vader',
    'Dr. Karl Brousseau',
    'Dr. Souchinda Wink',
  ]

  return doctors[Math.floor(Math.random() * doctors.length)]
}

const randomStatusCode = (): string => {
  const statusCodes = [
    'Unconfirmed', // question mark
    'Pending', // question mark
    'Confirmed', // check mark
    'Cancelled', // x mark
    'No show', // thumbs down
    'Waiting', // clock
    'Completed', // thumbs up
  ]

  return statusCodes[Math.floor(Math.random() * statusCodes.length)]
}

const randomStatusCodeIcon = (statusCode: string): FontAwesomeIconNames => {
  switch (statusCode) {
    case 'Unconfirmed':
    case 'Pending':
      return 'question'
    case 'Confirmed':
      return 'check'
    case 'Cancelled':
      return 'times'
    case 'No show':
      return 'thumbs-down'
    case 'Waiting':
      return 'clock-o'
    case 'Completed':
      return 'thumbs-up'
    default:
      return 'question'
  }
}

const createRandomAppointments = (count: number): Appointment[] => {
  const appointments = []

  for (let i = 0; i < count; i++) {
    const apptId = i + 1
    appointments.push(createRandomAppointment(apptId.toString()))
  }

  return appointments
}

const createRandomAppointment = (id: string): Appointment => {
  const statusCode = randomStatusCode()
  return {
    id,
    path: `/appointment/${id}`,
    date: randomDate(),
    visitType: randomVisitType(),
    statusCode: statusCode,
    statusCodeIcon: randomStatusCodeIcon(statusCode),
    doctor: randomDoctor(),
    invoiced: false, // dollar sign
    lastNoShow: false, // warning
    existingPatient: true, // refresh
    newPatient: false, // star
    leftWithRx: true, // pharamcy
    family: true, // group
    fullName: faker.person.fullName(),
    gender: faker.person.sex() === 'male' ? 'M' : 'F',
    dateOfBirth: faker.date.between({
      from: '1930-01-01T00:00:00.000Z',
      to: '2010-01-01T00:00:00.000Z',
    }),
  }
}

export default function HomeScreen() {
  const navigation = useRouter()

  useDocumentTitle('Home')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNavigate = (route: any) => {
    navigation.push(route)
  }

  // create a new constant called sortedAppointments that sorts date in ascending order
  const appointments = createRandomAppointments(25)
  const sortedAppointments = appointments.sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  )

  return (
    <View id="HomeScreen" style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <WinkHomePage
        appointments={sortedAppointments}
        onNavigate={handleNavigate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})
