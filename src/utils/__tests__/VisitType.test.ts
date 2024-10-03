// import visitTypes from /data/visitTypes.json
import { VisitType } from '@/interfaces/visitType'

import VisitTypes from '../../../data/visitTypes.json'
import { getEnglishVisitTypeGivenCode } from '../VisitType'

// create a test for getEnglishVisitTypeGivenCode passing in 1
// and returning 'Comprehensive Exam'
describe('getEnglishVisitTypeGivenCode', () => {
  // it('returns Comprehensive Exam when given 1', () => {
  //   const visitTypes = VisitTypes as unknown as VisitType[]
  //   const result = getEnglishVisitTypeGivenCode(visitTypes, 1)
  //   expect(result).toBe('Comprehensive exam')
  // })

  // spit out what the result is the exam id is 1
  it('spits out what the result is the exam id is 1', () => {
    const visitTypes = VisitTypes as unknown as VisitType[]
    const result = getEnglishVisitTypeGivenCode(visitTypes, 1)
    // write the result
    debugger
    console.log(result)
  })
})
