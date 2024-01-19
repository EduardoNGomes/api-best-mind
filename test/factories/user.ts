import { UserToCreateProps } from '@/repositories/UserRepository'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'

class UserFactory {
  createUserToUnitTest(data: Partial<UserToCreateProps>) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name ?? faker.word.words(1),
      password: data.password ?? faker.internet.password(),
      email: data.email ?? faker.internet.email(),
      createdAt: (data.createdAt as Date) ?? faker.date.anytime(),
      updatedAt: (data.updatedAt as Date) ?? faker.date.anytime(),
    }
    return user
  }
}

export default new UserFactory()
