import { ResponseError } from '@/shared/ResponseError'

export class ValidationError extends ResponseError {
  constructor(public readonly details: unknown) {
    super('Validation failed', 400)
  }
}
