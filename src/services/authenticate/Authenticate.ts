import { Either, left, right } from '@/erros/either'
import { AuthenticateRepository } from '@/repositories/AuthenticateRepository'
import { WrongCredentialsError } from '../erros/WrongCredentialsError'
import { Comparer } from '@/cryptography/comparer'
import { Encrypter } from '@/cryptography/Encrypter'

type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>

export class AuthenticateUserService {
  constructor(
    private authenticateRepository: AuthenticateRepository,
    private comparer: Comparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.authenticateRepository.findByEmail({
      email: email.toLowerCase(),
    })

    if (!user) return left(new WrongCredentialsError())

    const isUserValid = await this.comparer.compare(password, user.password)

    if (!isUserValid) return left(new WrongCredentialsError())

    const accessToken = await this.encrypter.encrypt({ sub: user.id })

    return right({ accessToken })
  }
}
