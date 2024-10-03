import { Store } from './store'

export type TileStatus = 'unviewed' | 'defaultSet' | 'modified'
export type TileStatusColor = 'border-yellow5' | 'border-red4' | 'border-green5'

export interface Field {
  label?: string
  name: string
  highlightedLabel?: boolean
  multiValue?: boolean
  options?: string | string[]
  size?: 'S' | 'M' | 'L' | 'XL'
  fields?: Field[]
  type?: string
  freestyle?: boolean
  defaultValue?: string
  normalValue?: string
  maxLength?: number
  simpleSelect?: boolean
  columns?: string[][]
  image?: string
  popup?: boolean
  optional?: boolean
  drawable?: boolean
  hasPd?: boolean
}

export interface Tile {
  id: string
  name: string
  isPreExam: boolean
  tileStatus: TileStatus
  addable: boolean
  editable: boolean
  relatedExams: Tile[] | null
  fields: Field[]
  content?: string | null | JSX.Element
}

export interface Visit {
  id: string
  date: Date
  lastUpdated: Date
  lastUpdatedBy: string
  doctorName: string
  tiles: Tile[]
}

export interface VisitAlt {
  id: string
  date: Date
  lastUpdated: Date
  lastUpdatedBy: string
  doctorName: string
  preTestExamName: string
  store: Store
  version: number
  locked: boolean
}
