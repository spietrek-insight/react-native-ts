import { useRef } from 'react'
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import uuid from 'react-native-uuid'

import { DayTime, EventLayout } from './WinkCalendar'

type SlotProps = {
  hour: number
  dayTime: DayTime | undefined
  date: Date
  event?: EventLayout | null
  onEventPress?: (event: EventLayout) => void
  onEmptySlotPress?: (date: Date, hour: number, topHalf: boolean) => void
}

export const WinkSlot: React.FC<SlotProps> = ({
  hour,
  dayTime,
  date,
  event = null,
  onEventPress,
  onEmptySlotPress,
}) => {
  const ref = useRef<View>(null)

  const handleEventPress = () => {
    if (onEventPress && event) {
      onEventPress(event)
    }
  }

  const handleEmptySlotPress = (event: GestureResponderEvent) => {
    setTimeout(() => {
      ref.current?.measure((fx, fy, width, height) => {
        const isTop = event.nativeEvent.locationY < height / 2
        if (onEmptySlotPress) {
          onEmptySlotPress(date, hour, isTop)
        }
      })
    }, 100)
  }

  const isEmptySlotBlock = (dayTime: DayTime | undefined, hour: number) => {
    if (!dayTime) {
      return true
    }
    if (dayTime.minTime === null || dayTime.maxTime === null) {
      return true
    }
    return !!(hour < dayTime.minTime || hour >= dayTime.maxTime)
  }

  if (isEmptySlotBlock(dayTime, hour)) {
    return <View ref={ref} style={styles.slotEmptyBlock}></View>
  }

  if (!event) {
    return (
      <View ref={ref} style={styles.slotBlock}>
        <TouchableOpacity
          testID="Slot.Empty_Slot_Button"
          onPressIn={handleEmptySlotPress}
          style={styles.emptySlotButton}
        ></TouchableOpacity>
      </View>
    )
  }

  const topPercentage = (event.startMinutes / 60) * 100
  const heightPercentage = ((event.endMinutes - event.startMinutes) / 60) * 100

  const renderAvailableEvent = () => {
    return (
      <Text
        style={[
          styles.eventText,
          event.type === 'available' && styles.availableEventTitle,
        ]}
      >
        Available
      </Text>
    )
  }

  const renderNormalEvent = () => {
    return (
      <View style={styles.normalEventContainer}>
        <View style={styles.normalEventNameContainer}>
          <Text style={[styles.eventText]}>
            {event.title} ({event.gender})
          </Text>
        </View>
        <View style={styles.normalEventStatusContainer}>
          <FontAwesome name="check" size={10} color="white" />
          <FontAwesome5 name="redo" size={10} color="white" />
        </View>
      </View>
    )
  }

  const renderUnavailableEvent = () => {
    return (
      <Text
        style={[
          styles.eventText,
          event.type === 'unavailable' && styles.unavailableEventTitle,
        ]}
      >
        {event.title}
      </Text>
    )
  }

  return (
    <View
      key={uuid.v4().toString()}
      style={[
        styles.eventBlock,
        event.type === 'available' && styles.avilableEventBlock,
        event.type === 'unavailable' && styles.unavilableEventBlock,
        {
          top: `${topPercentage}%`,
          height: `${heightPercentage}%`,
          left: `${event.left}%`,
          width: `${event.width}%`,
        },
      ]}
    >
      <TouchableOpacity
        testID="Slot.Event_Button"
        style={styles.eventButton}
        onPress={handleEventPress}
      >
        {event.type === 'available'
          ? renderAvailableEvent()
          : event.type === 'unavailable'
            ? renderUnavailableEvent()
            : renderNormalEvent()}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  hourContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  slotBlock: {
    flex: 1,
  },
  slotEmptyBlock: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  emptySlotButton: {
    flex: 1,
  },
  eventBlock: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#1DB3B3',
    borderRadius: 4,
    padding: 2,
    marginBottom: 1,
    borderColor: 'white',
    borderWidth: 1,
  },
  eventButton: {
    flex: 1,
  },
  normalEventContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  normalEventNameContainer: {
    flex: 1,
    flexGrow: 1,
  },
  normalEventStatusContainer: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: 16,
    marginLeft: 4,
    gap: 2,
  },
  eventText: {
    color: 'white',
    fontSize: 10,
  },
  avilableEventBlock: {
    backgroundColor: '#f2f2f2',
    borderColor: '#e6e6e6',
  },
  availableEventTitle: {
    color: 'black',
  },
  unavilableEventBlock: {
    backgroundColor: 'gray',
  },
  unavailableEventTitle: {
    color: 'white',
  },
})
