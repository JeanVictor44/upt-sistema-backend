import { UseCaseError } from '../use-case-error'

export class ResourceConflictError extends Error implements UseCaseError {
  constructor() {
    super('Resource Conflict error')
    this.name = 'ResourceConflictError'
  }
}
