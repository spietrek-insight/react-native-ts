import { StateCreator } from 'zustand'

import { Appointment } from '@/interfaces/appointment'

export interface AppointmentsState {
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  setAppointments: (appointments: Appointment[]) => void
  getAppointments: () => Appointment[]
  getAppointment: (id: string) => Appointment | undefined
  updateAppointment: (appointment: Appointment) => void
}

export const appointmentsStore: StateCreator<AppointmentsState> = (
  set,
  get,
) => ({
  appointments: [],
  // add appointment to the appointments array and sort the appointments by date
  addAppointment: appointment =>
    set(state => ({
      appointments: [...state.appointments, appointment].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    })),
  setAppointments: appointments =>
    set(() => ({
      appointments: appointments.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    })),
  getAppointments: () => get().appointments,
  getAppointment: id =>
    get().appointments.find(appointment => appointment.id === id),
  updateAppointment: appointment =>
    set(state => ({
      appointments: state.appointments.map(a =>
        a.id === appointment.id ? appointment : a,
      ),
    })),
})
