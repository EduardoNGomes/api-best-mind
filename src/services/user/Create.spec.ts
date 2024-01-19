import { InMemoryUsersRepository } from '@/repositories/test/InMemoryUsersRepository'
import { CreateUserService } from './Create'
import { HasherTest } from '@/cryptography/test/HasherTest'

let sut: CreateUserService
let inMemoryUsersRepository: InMemoryUsersRepository
let hasherTest: HasherTest

describe('Create User', () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    hasherTest = new HasherTest()

    sut = new CreateUserService(inMemoryUsersRepository, hasherTest)
  })

  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '10',
    }

    const result = await sut.execute(newUser)

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryUsersRepository.items).toHaveLength(1)
    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: await hasherTest.hash(newUser.password),
      }),
    )
  })

  it('shouldnt create a new user if the user already exist on database', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '10',
    }

    await sut.execute(newUser)

    const result = await sut.execute(newUser)

    expect(result.isLeft()).toBeTruthy()
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })
})
