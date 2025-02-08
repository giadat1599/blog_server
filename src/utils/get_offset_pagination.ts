export interface OffetPagination {
  page: number
  limit: number
  skip: number
  count: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export default function getOffsetPagination(page: number = 1, limit: number = 5, count: number): OffetPagination {
  const skip = (page - 1) * limit
  const totalPages = Math.ceil(count / limit)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page >= 2 && hasNextPage
  return {
    page,
    limit,
    skip,
    totalPages,
    count,
    hasNextPage,
    hasPreviousPage
  }
}
