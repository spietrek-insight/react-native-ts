import React from 'react'
import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import dayjs from 'dayjs'
import uuid from 'react-native-uuid'

import { DayTime, Event, EventLayout } from './WinkCalendar'
import { WinkSlot } from './WinkSlot'

type DayHoursProps = {
  style: object
  date: Date
  hour: number
  dayTime: DayTime
  events: Event[]
  onEventPress?: (event: Event) => void
  onEmptySlotPress?: (date: Date, hour: number, topHalf: boolean) => void
}

export const WinkDayHours: React.FC<DayHoursProps> = ({
  style,
  date,
  hour,
  dayTime,
  events,
  onEventPress,
  onEmptySlotPress,
}) => {
  const [currentTime, setCurrentTime] = useState(dayjs())
  const [minute, setMinute] = useState(dayjs().minute())

  useEffect(() => {
    const interval = setInterval(() => {
      setMinute(dayjs().minute())
      setCurrentTime(dayjs())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const isOverlapping = (eventA: EventLayout, eventB: Event): boolean => {
    return (
      Math.max(eventA.startMinutes, eventB.startMinutes) <
      Math.min(eventA.endMinutes, eventB.endMinutes)
    )
  }

  const adjustOverlappingEvents = (
    eventA: EventLayout,
    eventB: EventLayout,
  ) => {
    eventA.width = eventB.width = 50 // Split width for overlapping
    eventB.left = 50 // Offset the overlapping event
  }

  // Function to calculate layout of overlapping events
  const calculateLayout = (events: Event[]) => {
    // Sort events by start time to improve efficiency in overlap checking
    const sortedEvents = events.sort((a, b) => a.startMinutes - b.startMinutes)

    const withLayout = sortedEvents.map(event => ({
      ...event,
      left: 0,
      width: 100,
    }))

    // Compare each event only with the following events until a non-overlapping event is found
    for (let i = 0; i < withLayout.length; i++) {
      for (
        let j = i + 1;
        j < withLayout.length &&
        withLayout[i].endMinutes > withLayout[j].startMinutes;
        j++
      ) {
        if (isOverlapping(withLayout[i], withLayout[j])) {
          adjustOverlappingEvents(withLayout[i], withLayout[j])
        }
      }
    }

    return withLayout
  }

  // filter events where the event.eventDate equals the passed date and the event.eventDate hour equials the passed time
  const filteredEvents = events.filter(event => {
    return (
      event.eventDate.getDate() === date.getDate() &&
      event.eventDate.getMonth() === date.getMonth() &&
      event.eventDate.getFullYear() === date.getFullYear() &&
      event.eventDate.getHours() === hour
    )
  })

  // Processed events including layout calculations
  const processedEvents = calculateLayout(filteredEvents)

  const position = (minute / 60) * 100
  const isCurrentDay = currentTime.isSame(date, 'day')
  const currentHour = currentTime.hour()
  const isCurrentHour = currentHour === hour

  return (
    <View style={[styles.hourContainer, style]}>
      <WinkSlot
        hour={hour}
        date={date}
        dayTime={dayTime}
        onEmptySlotPress={onEmptySlotPress}
      />
      {processedEvents.map(event => {
        return (
          <WinkSlot
            key={uuid.v4().toString()}
            hour={hour}
            dayTime={dayTime}
            date={date}
            event={event}
            onEventPress={onEventPress}
          />
        )
      })}
      {isCurrentDay && isCurrentHour && (
        <View
          style={[
            styles.currentTime,
            {
              top: `${position}%`,
            },
          ]}
        ></View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  hourContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  currentTime: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'red',
    zIndex: -1,
  },
})
