export type CalendarType = 'unavailable' | 'available' | 'booked'

export interface Appointment {
  confirmed: boolean
  date: Date
  dateOfBirth: Date
  doctorId: number
  doctorName: string
  duration: number
  end: Date
  existingPatient: boolean
  family: boolean
  fullName: string
  gender: string
  id: string
  invoiced: boolean
  lastNoShow: boolean
  leftWithRx: boolean
  newPatient: boolean
  patientId: string
  start: Date
  statusCode: string
  statusCodeIcon: string
  type: CalendarType
  visitType: string
  waiting: boolean
}
