export type Movie = {
  id: number
  title: string
  overview: string
  release_date: string | null
  poster_path: string
  vote_average: number
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  vote_count: number
}

export type MoviesPage = {
  id: number
  query: string
  normalized_query: string
  page_number: number
  movie_ids: number[]
  total_pages: number
  total_results: number
}

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  password_hash: string
}
