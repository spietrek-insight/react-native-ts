import { Address } from './address'

export interface StoreHours {
  [key: number]: {
    open: number | null
    close: number | null
  }
}

export interface Store {
  id: string
  name: string
  address: Address
  storeHours: StoreHours
}
