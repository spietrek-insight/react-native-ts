import { StateCreator } from 'zustand'

import { PatientVisit } from '@/interfaces/patientVisit'

export interface PatientVisitState {
  patientVisit: PatientVisit | null
  setPatientVisit: (patientVisit: PatientVisit) => void
  getPatientVisit: () => PatientVisit | null
}

export const patientVisitStore: StateCreator<PatientVisitState> = (
  set,
  get,
) => ({
  patientVisit: null,
  setPatientVisit: patientVisit => set(() => ({ patientVisit })),
  getPatientVisit: () => get().patientVisit,
})
