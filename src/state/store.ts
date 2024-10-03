import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { AppointmentsState, appointmentsStore } from './appointmentsStore'
import { PatientState, patientStore } from './patientStore'
import { PatientVisitState, patientVisitStore } from './patientVisitStore'
import { UserState, userStore } from './userStore'
import { VisitState, visitStore } from './visitStore'

type StoreState = AppointmentsState &
  PatientState &
  PatientVisitState &
  UserState &
  VisitState

const useStore = create<StoreState>()(
  devtools((set, get, api) => ({
    ...appointmentsStore(set, get, api),
    ...patientStore(set, get, api),
    ...patientVisitStore(set, get, api),
    ...userStore(set, get, api),
    ...visitStore(set, get, api),
  })),
)

export default useStore
