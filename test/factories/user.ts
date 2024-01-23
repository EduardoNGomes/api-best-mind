import { UserToCreateProps } from '@/repositories/UserRepository'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

class UserFactory {
  createUserToUnitTest(data: Partial<UserToCreateProps>) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name ?? faker.word.words(1),
      password:
        data.password + '-hashed' ?? faker.internet.password() + '-hashed',
      email: data.email ?? faker.internet.email(),
      createdAt: (data.createdAt as Date) ?? faker.date.anytime(),
      updatedAt: (data.updatedAt as Date) ?? faker.date.anytime(),
    }
    return user
  }

  async createUserToE2ETest(data: Partial<UserToCreateProps>) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name ?? faker.word.words(1),
      password: await hash(data.password ?? faker.internet.password(), 8),
      email: data.email ?? faker.internet.email(),
      createdAt: (data.createdAt as Date) ?? undefined,
      updatedAt: (data.updatedAt as Date) ?? undefined,
    }
    return user
  }
}

export default new UserFactory()
