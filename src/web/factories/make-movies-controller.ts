import { MoviesController } from '../controllers/movies/movies-controller'
import { makeMoviesService } from '@/services/factories/make-movies-service'
import { makeMoviesPageService } from '@/services/factories/make-movies-page-service'

export function makeMoviesController() {
  const moviesService = makeMoviesService()
  const moviesPageService = makeMoviesPageService()
  const moviesController = new MoviesController(
    moviesService,
    moviesPageService,
  )
  return moviesController
}
