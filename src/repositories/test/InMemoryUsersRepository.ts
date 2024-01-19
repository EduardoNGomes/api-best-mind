import { Users } from '@prisma/client'
import {
  UserRepository,
  UserToCreateProps,
  UserToUpdateProps,
} from '../UserRepository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UserRepository {
  items: Users[] = []

  async create(data: UserToCreateProps): Promise<void> {
    const id = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()

    this.items.push({ id, ...data, createdAt, updatedAt })
  }

  async update(data: UserToUpdateProps): Promise<void> {
    const UserIndex = this.items.findIndex((item) => item.id === data.id)
    const updatedAt = new Date()

    const newUser: Users = {
      id: this.items[UserIndex].id,
      name: data.name ?? this.items[UserIndex].name,
      email: data.email ?? this.items[UserIndex].email,
      password: data.password ?? this.items[UserIndex].password,
      createdAt: this.items[UserIndex].createdAt,
      updatedAt,
    }

    this.items[UserIndex] = newUser
  }

  async findById(id: string): Promise<Users | null> {
    const user = this.items.find((user) => user.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((user) => user.id !== id)
  }
}
