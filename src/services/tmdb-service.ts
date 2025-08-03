import { env } from '@/env'
import { ApiRequestError } from '@/web/errors/api-request-error'

export class TmdbService {
  private readonly TMDB_API_BASE_URL: string
  private readonly TMDB_TOKEN: string

  constructor() {
    this.TMDB_API_BASE_URL = env.TMDB_URL
    this.TMDB_TOKEN = env.TMDB_TOKEN
  }

  fetchFromTMDB = async (endpoint: string, options = {}) => {
    const url = `${this.TMDB_API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.TMDB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiRequestError()
    }
    return data
  }
}
