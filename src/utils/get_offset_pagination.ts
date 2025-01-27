export interface OffetPagination {
  page: number
  limit: number
  skip: number
}

export default function getOffsetPagination(rawPage: number = 1, rawLimit: number = 5): OffetPagination {
  const page = Number(rawPage)
  const limit = Number(rawLimit)
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip
  }
}
