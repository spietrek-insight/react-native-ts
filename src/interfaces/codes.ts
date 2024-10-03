type RangeValue = {
  minValue: number
  isValueZero?: boolean
  maxValue: number
  stepSize: number
}

type ContactLensRange = {
  add?: RangeValue
  bc?: RangeValue
  cyl?: RangeValue
  sph: RangeValue
  axis?: RangeValue
  dia?: RangeValue
}

type ContactLens = {
  code: number
  wearingPeriod: string
  material: string
  ranges: ContactLensRange[]
  design: string
  type: string
  brand: string
  replacement: string
  quantityPerBox: number
  manufacturer: string
}

// export type CodeEntry =
//   | string
//   | { code: string | number; description: string }
//   | ContactLens
//   | ContactLens[]

export type CodeEntryString = string
export type CodeEntryObject = { code: string | number; description: string }
export type CodeEntryStringArray = CodeEntryString[]
export type CodeEntryContactLens = ContactLens
export type CodeEntryContactLensArray = ContactLens[]

export interface FormattedCode {
  key: string
  name: string
  codes:
    | CodeEntryString[]
    | CodeEntryObject[]
    | CodeEntryStringArray[]
    | CodeEntryContactLens[]
}
