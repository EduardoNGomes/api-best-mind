import { InMemoryUsersRepository } from '@/repositories/test/InMemoryUsersRepository'
import UserFactory from '../../../test/factories/user'
import { Users } from '@prisma/client'
import { randomUUID } from 'crypto'
import { EditUserService } from './Edit'
import { HasherTest } from '@/cryptography/test/HasherTest'

let sut: EditUserService
let inMemoryUsersRepository: InMemoryUsersRepository
let user: Users
let hasherTest: HasherTest

const id = randomUUID()

describe('Edit User', () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    hasherTest = new HasherTest()

    sut = new EditUserService(inMemoryUsersRepository, hasherTest, hasherTest)
  })

  beforeEach(() => {
    inMemoryUsersRepository.items = []
    user = UserFactory.createUserToUnitTest({ id, password: '123' })

    inMemoryUsersRepository.items.push(user)
  })

  it('should edit user', async () => {
    const result = await sut.execute({
      id,
      name: 'John Doe',
      oldPassword: '123',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryUsersRepository.items).toHaveLength(1)
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      id,
      name: 'John Doe',
      password: user.password,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: expect.any(Date),
    })
  })

  it('should only update user email', async () => {
    const result = await sut.execute({
      id,
      newEmail: 'johnDoe@email.com',
      oldPassword: '123',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      id,
      name: user.name,
      password: user.password,
      email: 'johnDoe@email.com',
      createdAt: user.createdAt,
      updatedAt: expect.any(Date),
    })
  })

  it('should only update user password', async () => {
    const result = await sut.execute({
      id,
      oldPassword: '123',
      newPassword: 'passwordUpadate',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      id,
      name: user.name,
      password: 'passwordUpadate-hashed',
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: expect.any(Date),
    })
  })

  it('shouldnt edit user if id was wrong', async () => {
    const result = await sut.execute({
      id: 'error test id',
      oldPassword: '123',
    })

    expect(result.isLeft()).toBeTruthy()
  })

  it('shouldnt edit user if password was wrong', async () => {
    const result = await sut.execute({
      id,
      oldPassword: 'error test password',
    })

    expect(result.isLeft()).toBeTruthy()
  })
  it('shouldnt edit user if email already', async () => {
    const anotherUser = UserFactory.createUserToUnitTest({
      email: 'john@example.com',
    })

    inMemoryUsersRepository.items.push(anotherUser)

    const result = await sut.execute({
      id,
      oldPassword: '123',
      newEmail: 'john@example.com',
    })

    expect(result.isLeft()).toBeTruthy()
  })
})
