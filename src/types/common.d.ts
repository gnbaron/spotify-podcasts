export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type PaginationState = {
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore: () => void
  total: number
}
