export interface Address {
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
}

export const getFullAddress = (address: Address): string => {
  return `${address.streetAddress}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`
}
