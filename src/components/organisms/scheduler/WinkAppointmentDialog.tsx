// create a dialog component using react-native-paper
// the component should have 2 actions: close and open
// the dialog should have a title which is the appointment visit type
// the dialog should have a subtitle which is the doctor's name
// the dialog should have a row for the patient's name
// the dialog should have a row for the appointment start date and end date
// the dialog should have 3 buttons: Cancel Apppointment, Double Book, and Reschedle

import { View, Text, StyleSheet } from 'react-native'

import { Dialog, Button, Portal } from 'react-native-paper'

import { Event } from '@/components/molecules/calendar/WinkCalendar'

type Props = {
  event: Event | null
  visible: boolean
  onClose: () => void
}

export const WinkAppointmentDialog = ({ event, visible, onClose }: Props) => {
  const title = event ? event.title : 'New Availability'

  return (
    <Portal>
      <Dialog
        dismissable
        visible={visible}
        onDismiss={onClose}
        style={styles.dialog}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {!event && (
            <View style={styles.container}>
              <View style={styles.row}>
                <Text>Dr. Darth Vader</Text>
              </View>
            </View>
          )}

          {event && (
            <View style={styles.container}>
              <View style={styles.row}>
                <Text>Dr. Darth Vader</Text>
              </View>
              <View style={styles.row}>
                <Text>{event.title}</Text>
              </View>
              <Text>
                {event.eventDate.toLocaleDateString()} -{' '}
                {event.eventDate.toLocaleDateString()}
              </Text>

              <View>
                <Button>Cancel Appointment</Button>
                <Button>Double Book</Button>
                <Button>Reschedule</Button>
              </View>
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Close</Button>
          <Button onPress={onClose}>Open</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  dialog: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})
