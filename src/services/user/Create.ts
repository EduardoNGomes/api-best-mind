import { Either, left, right } from '@/erros/either'
import { UserRepository } from '@/repositories/UserRepository'
import { ResourceAlreadyExistError } from '../erros/ResourceAlreadyExistError'
import { Hasher } from '@/cryptography/hasher'

type CreateUserRequest = {
  email: string
  name: string
  password: string
}

type CreateUserResponse = Either<ResourceAlreadyExistError, object>

export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userExist = await this.userRepository.findByEmail(email)

    if (userExist) return left(new ResourceAlreadyExistError())

    const hashedPassword = await this.hasher.hash(password)

    await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return right({})
  }
}
