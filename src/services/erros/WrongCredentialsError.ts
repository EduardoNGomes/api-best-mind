export class WrongCredentialsError extends Error {
  constructor() {
    super('Your crendentials are invalid')
  }
}
