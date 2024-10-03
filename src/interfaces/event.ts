export type CalendarType = 'unavailable' | 'available' | 'booked'

export interface Event {
  id: string
  resourceTitle: string
  title: string
  start: Date
  end: Date
  resourceId: number
  type: CalendarType
}
