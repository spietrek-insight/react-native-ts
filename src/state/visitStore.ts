import { StateCreator } from 'zustand'

import { ExamDef } from '@/interfaces/examDef'

export interface VisitState {
  visit: {
    examDefs?: ExamDef[]
    preExamDefs?: ExamDef[]
  }
  setExamDefList: (examDefs: ExamDef[]) => void
  setPreExamDefList: (preExamDefs: ExamDef[]) => void
  getExamDefList: (isPreExam: boolean) => ExamDef[] | undefined
}

export const visitStore: StateCreator<VisitState> = (set, get) => ({
  visit: {
    examDefs: [],
    preExamDefs: [],
  },
  setExamDefList: examDefs =>
    set(state => ({
      visit: {
        ...state.visit,
        examDefs,
      },
    })),
  setPreExamDefList: preExamDefs =>
    set(state => ({
      visit: {
        ...state.visit,
        preExamDefs,
      },
    })),
  getExamDefList: isPreExam => {
    const state = get()
    return isPreExam ? state.visit.preExamDefs : state.visit.examDefs
  },
})
