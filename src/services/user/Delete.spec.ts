import { InMemoryUsersRepository } from '@/repositories/test/InMemoryUsersRepository'
import { DeleteUserService } from './Delete'
import { Users } from '@prisma/client'
import { randomUUID } from 'crypto'
import UserFactory from '../../../test/factories/user'
let sut: DeleteUserService
let inMemoryUsersRepository: InMemoryUsersRepository
let user: Users

const id = randomUUID()

describe('Delete User by id', () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new DeleteUserService(inMemoryUsersRepository)

    user = UserFactory.createUserToUnitTest({ id })

    inMemoryUsersRepository.items.push(user)
  })

  it('should delete a user', async () => {
    expect(inMemoryUsersRepository.items).toHaveLength(1)

    const result = await sut.execute({ id })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })
  it('shouldnt delete a user if id was wrong', async () => {
    const result = await sut.execute({ id })

    expect(result.isLeft()).toBeTruthy()
  })
})
