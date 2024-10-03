export interface ExamSection {
  name: string
  order: number
  size: 'half' | 'full'
  isInactive: boolean
}

export interface ExamDef {
  section: ExamSection
  addButton: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tiles: any[]
}
