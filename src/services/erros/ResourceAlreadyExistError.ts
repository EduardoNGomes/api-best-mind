export class ResourceAlreadyExistError extends Error {
  constructor() {
    super('Resource already exists')
  }
}
