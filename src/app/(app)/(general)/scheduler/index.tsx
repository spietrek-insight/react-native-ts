import { View } from 'react-native'

import dayjs from 'dayjs'

import { Event, DayTime } from '@/components/molecules/calendar/WinkCalendar'
import { WinkScheduler } from '@/components/organisms/scheduler/WinkScheduler'
import { YEAR_FORMAT } from '@/constants/dates'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function SchedulerScreen() {
  useDocumentTitle('Scheduler')

  const handleDayOrWeekChange = (date: dayjs.Dayjs) => {
    console.log('New date:', date.format(YEAR_FORMAT))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleRenderEvent = (event: any) => {
  //   return <Text key={event.id}>{event.title}</Text>
  // }

  // const handleTimeSlotSelect = (hour: number, minute: number) => {
  //   console.log('Selected time slot:', hour, minute)
  // }

  // create events using the Event type. appointments should be between 8am and 5pm and should start at either 00 or 30 minutes
  // appointments should be for the current week
  // type Event = {
  //   id: string
  //   title: string
  //   startDate: string // ISO string
  //   endDate: string // ISO string
  //   description?: string
  // }
  const events: Event[] = [
    {
      title: 'Steve Pietrek',
      startMinutes: 0,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 8, 0),
      gender: 'M',
    },
    {
      title: 'Jane Doe',
      startMinutes: 0,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 9, 0),
      gender: 'F',
    },
    {
      title: 'Noah Pietrek',
      startMinutes: 0,
      endMinutes: 30,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 10, 0),
      gender: 'M',
    },
    {
      title: 'Laura Pietrek',
      startMinutes: 30,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 10, 30),
      gender: 'F',
    },
    {
      title: 'John Marks',
      startMinutes: 0,
      endMinutes: 45,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 11, 0),
      gender: 'M',
    },
    {
      title: 'Follow up',
      startMinutes: 45,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 11, 45),
      gender: 'U',
    },
    {
      title: 'Unavailable',
      startMinutes: 0,
      endMinutes: 60,
      type: 'unavailable',
      eventDate: new Date(2024, 4, 28, 12, 0),
    },
    {
      title: 'Unavailable',
      startMinutes: 0,
      endMinutes: 60,
      type: 'unavailable',
      eventDate: new Date(2024, 4, 28, 13, 0),
    },
    {
      title: 'Unavailable',
      startMinutes: 0,
      endMinutes: 60,
      type: 'unavailable',
      eventDate: new Date(2024, 4, 28, 14, 0),
    },
    {
      title: 'Unavailable',
      startMinutes: 0,
      endMinutes: 60,
      type: 'unavailable',
      eventDate: new Date(2024, 4, 28, 15, 0),
    },
    {
      title: 'John Doe',
      startMinutes: 0,
      endMinutes: 30,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 16, 0),
      gender: 'M',
    },
    {
      title: 'Follow up',
      startMinutes: 15,
      endMinutes: 30,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 16, 15),
      gender: 'F',
    },
    {
      title: 'CL Fitting',
      startMinutes: 30,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 28, 16, 30),
      gender: 'F',
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 30,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 8, 0),
    },
    {
      title: 'Available',
      startMinutes: 30,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 8, 30),
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 30,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 9, 0),
    },
    {
      title: 'Available',
      startMinutes: 30,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 9, 30),
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 10, 0),
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 11, 0),
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 12, 0),
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 13, 0),
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 14, 0),
    },
    {
      title: 'Available',
      startMinutes: 0,
      endMinutes: 60,
      type: 'available',
      eventDate: new Date(2024, 4, 29, 15, 0),
    },
    {
      title: 'Unavailable',
      startMinutes: 0,
      endMinutes: 60,
      type: 'unavailable',
      eventDate: new Date(2024, 4, 29, 16, 0),
    },
    {
      title: 'Unavailable',
      startMinutes: 0,
      endMinutes: 60,
      type: 'unavailable',
      eventDate: new Date(2024, 4, 29, 17, 0),
    },
    {
      title: 'Last Appointment',
      startMinutes: 0,
      endMinutes: 30,
      type: 'appointment',
      eventDate: new Date(2024, 4, 29, 18, 0),
      gender: 'F',
    },
    {
      title: 'Last Appointment',
      startMinutes: 30,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 29, 18, 0),
      gender: 'F',
    },
    {
      title: 'First Appointment',
      startMinutes: 0,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 31, 7, 0),
      gender: 'F',
    },
    {
      title: 'Second Appointment',
      startMinutes: 0,
      endMinutes: 60,
      type: 'appointment',
      eventDate: new Date(2024, 4, 31, 8, 0),
      gender: 'M',
    },
  ]

  const days: DayTime[] = [
    { day: 'sun', minTime: null, maxTime: null },
    { day: 'mon', minTime: 8, maxTime: 17 },
    { day: 'tue', minTime: 8, maxTime: 17 },
    { day: 'wed', minTime: 8, maxTime: 19 },
    { day: 'thu', minTime: 8, maxTime: 17 },
    { day: 'fri', minTime: 7, maxTime: 15 },
    { day: 'sat', minTime: 8, maxTime: 12 },
  ]

  return (
    <View id="SchedulerScreen" style={{ width: '100%' }}>
      <WinkScheduler
        events={events}
        days={days}
        minDate={dayjs().subtract(365, 'day').toISOString()}
        maxDate={dayjs().add(60, 'day').toISOString()}
        onDayOrWeekChange={handleDayOrWeekChange}
        // onTimeSlotSelect={handleTimeSlotSelect}
      />
    </View>
  )
}
