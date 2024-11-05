import type { Order } from "@/types"

type ComparableItem = string | number | Date

const compareItems = (a: ComparableItem, b: ComparableItem, asc = true) => {
  if (a > b) {
    return asc ? 1 : -1;
  }
  if (a < b) {
    return asc ? -1 : 1;
  }
  return 0;
}

export const toSortedTimes = (list: string[] | Set<string>, order: Order = 'asc') => {
  const copy = [...list]
  const asc = order === 'asc'

  copy.sort((a, b) => {
    const aDate = new Date(`1970/01/01 ${a}`)
    const bDate = new Date(`1970/01/01 ${b}`)

    return compareItems(aDate, bDate, asc)
  })

  return copy
}

export const toSorted = <T extends string | number>(list: T[] | Set<T>, order: Order = 'asc') => {
  const copy = [...list]
  const asc = order === 'asc'
  
  copy.sort((a, b) => {
    return compareItems(a, b, asc)
  })

  return copy
}
