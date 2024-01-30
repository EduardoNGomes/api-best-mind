import { Either, left, right } from '@/erros/either'
import { UserRepository } from '@/repositories/UserRepository'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'
import { Comparer } from '@/cryptography/comparer'
import { WrongCredentialsError } from '../erros/WrongCredentialsError'
import { ResourceAlreadyExistError } from '../erros/ResourceAlreadyExistError'
import { Hasher } from '@/cryptography/hasher'

type EditUserRequest = {
  id: string
  name?: string
  newEmail?: string
  oldPassword: string
  newPassword?: string
}

type EditUserResponse = Either<
  ResourceNotFoundError | WrongCredentialsError | ResourceAlreadyExistError,
  object
>

export class EditUserService {
  constructor(
    private userRepository: UserRepository,
    private comparer: Comparer,
    private hasher: Hasher,
  ) {}

  async execute({
    id,
    name,
    oldPassword,
    newEmail,
    newPassword,
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) return left(new ResourceNotFoundError())

    const userIsValid = await this.comparer.compare(oldPassword, user.password)

    if (!userIsValid) return left(new WrongCredentialsError())

    if (newEmail) {
      const emailAlreadyExists = await this.userRepository.findByEmail(
        newEmail.toLowerCase(),
      )

      if (emailAlreadyExists) return left(new ResourceAlreadyExistError())
    }

    const email = newEmail || user.email

    const password = newPassword
      ? await this.hasher.hash(newPassword)
      : user.password

    await this.userRepository.update({
      id,
      name: name || user.name,
      email: email.toLowerCase(),
      password,
    })

    return right({})
  }
}
