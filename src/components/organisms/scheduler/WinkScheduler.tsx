// create a Scheduler component that uses the following props. it should render out a calendar component

import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import dayjs from 'dayjs'

import { WinkAppointmentDialog } from './WinkAppointmentDialog'

import {
  WinkCalendar,
  DayTime,
  Event,
} from '@/components/molecules/calendar/WinkCalendar'

interface Props {
  events: Event[]
  days: DayTime[]
  minDate?: string // ISO date string
  maxDate?: string // ISO date string
  onDayOrWeekChange: (date: dayjs.Dayjs) => void // Callback for when the visible week or day changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // renderEvent: (eventData: any) => JSX.Element // Render prop for custom event rendering
  // onTimeSlotSelect: (hour: number, minute: number) => void // Callback for time slot selection
}

export const WinkScheduler = ({
  events = [],
  days = [],
  minDate,
  maxDate,
  onDayOrWeekChange,
}: Props) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleNewAvailabilityPress = () => {
    setSelectedEvent(null)
    setDialogVisible(true)
  }

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event)
    setDialogVisible(true)
  }

  const handleDialogClose = () => {
    setDialogVisible(false)
    setSelectedEvent(null)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Scheduler</Text>

      <WinkAppointmentDialog
        event={selectedEvent}
        visible={dialogVisible}
        onClose={handleDialogClose}
      />

      <WinkCalendar
        events={events}
        days={days}
        minDate={minDate}
        maxDate={maxDate}
        onDayOrWeekChange={onDayOrWeekChange}
        onEventPress={handleEventPress}
        onTimeSlotSelect={handleNewAvailabilityPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
    paddingRight: 40,
    marginBottom: 26,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
