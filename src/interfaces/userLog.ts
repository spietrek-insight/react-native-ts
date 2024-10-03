export interface UserLog {
  idUserLog: number
  date: number
  action: number
  comment: string
  User_idUser: number
  Store_idStore: number
  table: string
  field: string
  key: number
  oldValue: string
  newValue: string
  flag: number
  note: null
  Patient_idPatient: number
  Visit_idVisit: number
  ip: null
  mfaProvided: number
  usingToken: number
}
