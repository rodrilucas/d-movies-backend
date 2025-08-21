import type { SortBy, SortOrder } from '@/services/movies-service'

export type SortOptions = {
  sortBy?: SortBy
  sortOrder?: SortOrder
}
export function parseSortParam(sort?: string): SortOptions {
  if (!sort) return {}
  const [maybeField, maybeDir] = sort.split('.') as [SortBy, SortOrder]
  const validBy = new Set<SortBy>([
    'popularity',
    'release_date',
    'vote_average',
    'vote_count',
    'title',
  ])
  const validOrder = new Set<SortOrder>(['asc', 'desc'])
  return {
    sortBy: validBy.has(maybeField) ? maybeField : undefined,
    sortOrder: validOrder.has(maybeDir) ? maybeDir : undefined,
  }
}
