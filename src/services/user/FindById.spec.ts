import { InMemoryUsersRepository } from '@/repositories/test/InMemoryUsersRepository'
import { FindUserByIdService } from './FindById'
import UserFactory from '../../../test/factories/user'
import { Users } from '@prisma/client'
import { randomUUID } from 'crypto'

let sut: FindUserByIdService
let inMemoryUsersRepository: InMemoryUsersRepository
let user: Users

const id = randomUUID()

describe('Find User by id', () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new FindUserByIdService(inMemoryUsersRepository)

    user = UserFactory.createUserToUnitTest({ id })

    inMemoryUsersRepository.items.push(user)
  })

  it('should find a unique user', async () => {
    const result = await sut.execute({ id })

    expect(result.isRight()).toBeTruthy()
    if ('users' in result.value) {
      expect(result.value.users).toMatchObject({
        id,
        name: user.name,
        password: user.password,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    }
  })
  it('shouldnt find a unique user if id was wrong', async () => {
    const result = await sut.execute({ id: 'error test id' })

    expect(result.isLeft()).toBeTruthy()
  })
})
