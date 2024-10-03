import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react'

type UsePaginationProps = {
  itemsLength: number
}

type UsePaginationReturn = {
  page: number
  itemsPerPage: number
  from: number
  to: number
  setPage: Dispatch<SetStateAction<number>>
  onItemsPerPageChange: (numberOfItemsPerPage: number) => void
  numberOfItemsPerPageList: number[]
}

export const usePagination = ({
  itemsLength,
}: UsePaginationProps): UsePaginationReturn => {
  const [page, setPage] = useState(0)
  const [numberOfItemsPerPageList] = useState([10, 20, 50, 100])
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[1])

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, itemsLength)

  useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  const onItemsPerPageChange = useCallback(
    (itemsPerPageIndex: number) => {
      setItemsPerPage(numberOfItemsPerPageList[itemsPerPageIndex])
    },
    [numberOfItemsPerPageList],
  )

  return {
    page,
    itemsPerPage,
    from,
    to,
    setPage,
    onItemsPerPageChange,
    numberOfItemsPerPageList,
  }
}
