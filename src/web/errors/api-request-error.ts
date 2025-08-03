export class ApiRequestError extends Error {
  constructor() {
    super('Ocorreu algum erro durante a requisição para a API do TMDB')
  }
}
