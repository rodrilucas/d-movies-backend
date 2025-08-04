import { TmdbService } from '../tmdb-service'

export function makeTmdbService() {
  const tmdbService = new TmdbService()
  return tmdbService
}
