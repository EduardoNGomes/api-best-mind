import { Either, left, right } from '@/erros/either'
import { UserRepository } from '@/repositories/UserRepository'
import { Users } from '@prisma/client'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'

type FindUserByIdRequest = {
  id: string
}

type FindUserByIdResponse = Either<ResourceNotFoundError, { users: Users }>

export class FindUserByIdService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    const users = await this.userRepository.findById(id)

    if (!users) return left(new ResourceNotFoundError())

    return right({ users })
  }
}
