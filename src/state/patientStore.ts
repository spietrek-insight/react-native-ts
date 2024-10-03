import { StateCreator } from 'zustand'

import { Patient } from '@/interfaces/patient'
import { Visit } from '@/interfaces/visit'

export interface PatientState {
  visits: Visit[]
  patient: Patient | null
  setPatient: (patient: Patient) => void
  getPatient: () => Patient | null
  setVisits: (visits: Visit[]) => void
  setVisit: (visit: Visit) => void
  getVisit: (id: string) => Visit | undefined
}

export const patientStore: StateCreator<PatientState> = (set, get) => ({
  visits: [],
  patient: null,
  setPatient: patient => set(() => ({ patient })),
  getPatient: () => get().patient,
  setVisits: visits => set(() => ({ visits })),
  setVisit: visit =>
    set(state => ({
      visits: state.visits.map(v => (v.id === visit.id ? visit : v)),
    })),
  getVisit: id => get().visits.find(visit => visit.id === id),
})
