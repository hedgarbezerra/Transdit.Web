export interface PaginatedResult<T> {
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  data: Array<T>
  hasPreviousPage: boolean
  hasNextPage: boolean
}
