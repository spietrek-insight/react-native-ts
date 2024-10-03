import { Patient } from './patient'
import { Referral } from './referral'
import { VisitAlt } from './visit'

export interface PatientVisit {
  patient: Patient
  visits: VisitAlt[]
  referrals: Referral[]
}
