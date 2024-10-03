import { VisitType } from '../interfaces/visitType'

export const getEnglishVisitTypeGivenCode = (
  visitTypes: VisitType[],
  id: number,
): string => {
  // filter id equal to idVisitTypes in
  const items = visitTypes.filter(visitType => visitType.idVisitTypes === id)
  const [first] = items
  return first.name_en || ''
}
