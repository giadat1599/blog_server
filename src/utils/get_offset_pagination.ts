export interface OffetPagination {
  page: number
  limit: number
  skip: number
}

export default function getOffsetPagination(page: number = 1, limit: number = 5): OffetPagination {
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip
  }
}
