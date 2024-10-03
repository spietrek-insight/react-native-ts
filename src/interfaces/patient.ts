import { Address } from './address'

export interface Patient {
  id: string
  firstName: string
  lastName: string
  gender: string
  alias: string
  dateOfBirth: Date
  insuranceNumber: string
  insuranceVersion: string
  insuranceExpiration: string
  phoneNumber: string
  cellNumber: string
  address: Address
  email: string
  age: number
  occupation: string
}
