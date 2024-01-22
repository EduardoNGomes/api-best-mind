import { HasherTest } from '@/cryptography/test/HasherTest'
import { AuthenticateUserService } from './Authenticate'
import { EncrypterTest } from '@/cryptography/test/EncrypterTest'
import { InMemoryAuthenticateRepository } from '@/repositories/test/InMemoryAuthenticateRepository'
import { Users } from '@prisma/client'
import UserFactory from '../../../test/factories/user'
import { WrongCredentialsError } from '../erros/WrongCredentialsError'

let sut: AuthenticateUserService
let inMemoryAuthenticateRepository: InMemoryAuthenticateRepository
let hasherTest: HasherTest
let encrypterTest: EncrypterTest
let mockUser: Users

describe('Autenthicate User', () => {
  beforeAll(async () => {
    inMemoryAuthenticateRepository = new InMemoryAuthenticateRepository()
    hasherTest = new HasherTest()
    encrypterTest = new EncrypterTest()

    sut = new AuthenticateUserService(
      inMemoryAuthenticateRepository,
      hasherTest,
      encrypterTest,
    )

    mockUser = UserFactory.createUserToUnitTest({ password: '123' })

    inMemoryAuthenticateRepository.items.push(mockUser)
  })

  it('should autenthicate a user', async () => {
    const result = await sut.execute({
      email: mockUser.email,
      password: '123',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toHaveProperty('accessToken')
  })

  it('shouldnt authenticate user with wrong email', async () => {
    const result = await sut.execute({
      email: 'johnDoeWrong@email.com',
      password: '123',
    })

    expect(result.value).toBeInstanceOf(WrongCredentialsError)
    expect(result.isLeft()).toBeTruthy()
  })
  it('shouldnt authenticate user with wrong password', async () => {
    const result = await sut.execute({
      email: mockUser.email,
      password: 'wrong password test',
    })

    expect(result.value).toBeInstanceOf(WrongCredentialsError)
    expect(result.isLeft()).toBeTruthy()
  })
})
