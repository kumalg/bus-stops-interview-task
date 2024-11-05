export const toSortedTimes = (times: string[], order: 'asc' | 'desc' = 'asc') => {
  const copy = [...times]

  copy.sort((a, b) => {
    const aDate = new Date(`1970/01/01 ${a}`)
    const bDate = new Date(`1970/01/01 ${b}`)

    if (aDate > bDate) {
      return order === 'asc' ? 1 : -1;
    }
    if (aDate < bDate) {
      return order === 'asc' ? -1 : 1;
    }
    return 0;
  })

  return copy
}
