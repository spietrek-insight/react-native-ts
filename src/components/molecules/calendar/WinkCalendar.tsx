/* eslint-disable max-lines */
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Button, IconButton } from 'react-native-paper'
import uuid from 'react-native-uuid'

import { WinkDayHours } from './WinkDayHours'

import { Theme } from '@/providers/theme'
import { useTheme } from '@/providers/themeProvider'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(customParseFormat)
dayjs.extend(duration)

interface Doctor {
  id: string
  name: string
}

const doctors: Doctor[] = [
  { id: '1', name: 'Dr. Darth Vader' },
  { id: '2', name: 'Dr. Luke Skywalker' },
  { id: '3', name: 'Dr. Princess Leia' },
  { id: '4', name: 'Dr. Han Solo' },
  { id: '5', name: 'Dr. Chewbacca' },
]

export type DayTime = {
  day: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
  minTime: number | null
  maxTime: number | null
}

const NUMBER_OF_DAYS = {
  day: 1,
  week: 7,
  '3days': 3,
}

export interface Event {
  eventDate: Date
  startMinutes: number
  endMinutes: number
  title: string
  type: EventType
  gender?: string
}

export interface EventLayout extends Event {
  left: number
  width: number
}

export type EventType = 'available' | 'unavailable' | 'appointment'

export type ViewMode = 'day' | 'week' | '3days'

const isDateWithinRange = (
  date: dayjs.Dayjs,
  minDate?: string,
  maxDate?: string,
) => {
  if (minDate && date.isBefore(dayjs(minDate))) return false

  return !(maxDate && date.isAfter(dayjs(maxDate)))
}

const getOverallMinMaxTime = (days: DayTime[]) => {
  const validDays = days.filter(
    day => day.minTime !== null && day.maxTime !== null,
  )
  const minTime = Math.min(...validDays.map(day => day.minTime as number))
  const maxTime = Math.max(...validDays.map(day => day.maxTime as number))

  return { minTime, maxTime }
}

const addDays = (
  viewMode: ViewMode,
  currentDate: dayjs.Dayjs,
  direction: 'previous' | 'next',
): dayjs.Dayjs => {
  const daysToAdd = NUMBER_OF_DAYS[viewMode]
  const increment = direction === 'next' ? daysToAdd : -daysToAdd

  return currentDate.add(increment, 'day')
}

interface Props {
  events: Event[]
  days: DayTime[]
  minDate?: string // ISO date string
  maxDate?: string // ISO date string
  onDayOrWeekChange: (date: dayjs.Dayjs) => void // Callback for when the visible week or day changes
  onEventPress?: (event: Event) => void
  onTimeSlotSelect?: (date: Date, hour: number, minute: number) => void // Callback for time slot selection
}

export const WinkCalendar = ({
  events = [],
  days = [],
  minDate,
  maxDate,
  onDayOrWeekChange,
  onEventPress,
  onTimeSlotSelect,
}: Props) => {
  const theme = useTheme()
  const styles = makeStyles(theme)
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [viewMode, setViewMode] = useState<'day' | 'week' | '3days'>('day')

  const navigateDate = (direction: 'previous' | 'next') => {
    const updatedDate: dayjs.Dayjs = addDays(viewMode, currentDate, direction)

    if (!isDateWithinRange(updatedDate, minDate, maxDate)) return

    setCurrentDate(updatedDate)
    onDayOrWeekChange(updatedDate)
  }

  const renderTimeSlots = (minTime: number, maxTime: number) =>
    Array.from({ length: maxTime - minTime }, (_, i) => (
      <View style={styles.emptyCell} key={uuid.v4().toString()}>
        <Text key={i} style={styles.timeCell}>{`${minTime + i}:00`}</Text>
      </View>
    ))

  const handleEventPress = (event: Event) => {
    if (onEventPress) {
      onEventPress(event)
    }
  }

  const handleEmptySlotPress = (date: Date, hour: number, topHalf: boolean) => {
    if (onTimeSlotSelect) {
      onTimeSlotSelect(date, hour, topHalf ? 0 : 30)
    }
  }

  const { minTime, maxTime } = getOverallMinMaxTime(days)

  // Helper function to render a day column
  const renderDayColumn = (
    day: dayjs.Dayjs,
    i: number,
    minTime: number,
    maxTime: number,
    dayTime: DayTime,
    events: Event[],
    // eslint-disable-next-line max-params
  ) => (
    <View
      id="Calendar.Day_Column"
      testID="Calendar.Day_Column"
      key={i}
      style={i > 0 ? styles.dayColumn : styles.timeColumn}
    >
      <Text style={styles.dayLabel}>{i > 0 ? day.format('ddd D') : ' '}</Text>
      {i === 0 ? renderTimeSlots(minTime, maxTime) : null}
      {i > 0 &&
        Array.from({ length: maxTime - minTime }, (_, index) => (
          <View key={uuid.v4().toString()} style={styles.emptyCell}>
            <WinkDayHours
              date={day.toDate()}
              dayTime={dayTime}
              hour={minTime + index}
              events={events}
              style={styles.hourlyStyle}
              onEventPress={handleEventPress}
              onEmptySlotPress={handleEmptySlotPress}
            />
          </View>
        ))}
    </View>
  )

  // Main view rendering function using day column renderer
  const renderCalendarView = (
    currentDate: dayjs.Dayjs,
    minTime: number,
    maxTime: number,
    numberOfDays: number,
    startFunction: (currentDate: dayjs.Dayjs) => dayjs.Dayjs,
  ) => {
    const startDay = startFunction(currentDate)

    return (
      <>
        {Array.from({ length: numberOfDays + 1 }, (_, i) => {
          const day = startDay.add(i, 'day').subtract(1, 'day')
          const dayTime = days.find(
            d => d.day === day.format('ddd').toLowerCase(),
          ) as DayTime

          return renderDayColumn(day, i, minTime, maxTime, dayTime, events)
        })}
      </>
    )
  }

  // Specific implementations for day and week views
  const renderDayView = (
    date: dayjs.Dayjs,
    minTime: number,
    maxTime: number,
  ) => {
    return doctors.map(doctor => (
      <View key={doctor.id} style={styles.doctorContainer}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <View style={styles.doctorCalendarContent}>
          {renderCalendarView(
            date,
            minTime,
            maxTime,
            NUMBER_OF_DAYS[viewMode],
            currentDate => currentDate,
          )}
        </View>
      </View>
    ))
  }

  const renderWeekView = (
    currentDate: dayjs.Dayjs,
    minTime: number,
    maxTime: number,
  ) => {
    return renderCalendarView(
      currentDate,
      minTime,
      maxTime,
      NUMBER_OF_DAYS[viewMode],
      currentDate => currentDate,
    )
  }

  const renderView = (
    viewMode: ViewMode,
    currentDate: dayjs.Dayjs,
    minTime: number,
    maxTime: number,
  ) => {
    if (viewMode === 'day') {
      return renderDayView(currentDate, minTime, maxTime)
    }

    return renderWeekView(currentDate, minTime, maxTime)
  }

  return (
    <View id="view-container" style={styles.container}>
      <>
        <View style={styles.navigation}>
          <Button onPress={() => setCurrentDate(dayjs())}>Today</Button>
          <IconButton
            icon="arrow-left"
            onPress={() => navigateDate('previous')}
            iconColor={theme.colors.primary}
            size={24}
            style={styles.navigationButton}
          />
          <IconButton
            icon="arrow-right"
            onPress={() => navigateDate('next')}
            iconColor={theme.colors.primary}
            size={24}
            style={styles.navigationButton}
          />
        </View>

        <View style={styles.viewModeToggle}>
          <Button
            mode={viewMode === 'day' ? 'contained' : 'outlined'}
            onPress={() => setViewMode('day')}
            style={{ marginRight: 10 }}
          >
            Day
          </Button>
          <Button
            mode={viewMode === '3days' ? 'contained' : 'outlined'}
            onPress={() => setViewMode('3days')}
            style={{ marginLeft: 10 }}
          >
            3 Days
          </Button>
          <Button
            mode={viewMode === 'week' ? 'contained' : 'outlined'}
            onPress={() => setViewMode('week')}
            style={{ marginLeft: 10 }}
          >
            Week
          </Button>
        </View>
      </>

      <ScrollView
        horizontal={false}
        id="calendar-content-container"
        style={styles.calendarContentContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <View id="calendar-content" style={styles.calendarContent}>
          {renderView(viewMode, currentDate, minTime, maxTime)}
        </View>
      </ScrollView>
    </View>
  )
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    navigation: {
      flexDirection: 'row',
    },
    navigationButton: {
      margin: 0, // Remove default margin of IconButton
      padding: 0, // Remove default padding of IconButton
      marginLeft: 10,
    },
    viewModeToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 4,
    },
    calendarContentContainer: {
      flex: 1,
      width: '100%',
    },
    scrollViewContentContainer: {
      flexGrow: 1,
    },
    calendarContent: {
      flex: 1,
      flexDirection: 'row',
    },
    doctorCalendarContent: {
      flex: 1,
      flexDirection: 'row',
    },
    doctorContainer: {
      flex: 1,
      marginRight: 20,
    },
    doctorName: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginVertical: 10,
      marginLeft: 40,
    },
    timeColumn: {
      flex: 1,
      maxWidth: 50,
    },
    timeCell: {
      flex: 1,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderColor: '#ddd',
    },
    dayColumn: {
      flex: 1,
    },
    dayLabel: {
      textAlign: 'center',
      fontWeight: 'bold',
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    emptyCell: {
      flex: 1,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderColor: '#ddd',
    },
    hourlyStyle: {
      flex: 1,
    },
  })
