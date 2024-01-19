import { Either, left, right } from '@/erros/either'
import { UserRepository } from '@/repositories/UserRepository'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'

type DeleteUserRequest = {
  id: string
}

type DeleteUserResponse = Either<ResourceNotFoundError, object>

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) return left(new ResourceNotFoundError())

    await this.userRepository.delete(id)

    return right({})
  }
}
