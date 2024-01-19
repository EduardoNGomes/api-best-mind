import { PrismaClient, Users } from '@prisma/client'
import {
  UserRepository,
  UserToCreateProps,
  UserToUpdateProps,
} from '../UserRepository'

export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: UserToCreateProps): Promise<void> {
    await this.prisma.users.create({ data })
  }

  async update(data: UserToUpdateProps): Promise<void> {
    await this.prisma.users.update({ data, where: { id: data.id } })
  }

  async findById(id: string): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({ where: { id } })

    return user
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({ where: { email } })

    return user
  }

  async delete(id: string): Promise<void> {
    await this.prisma.users.delete({ where: { id } })
  }
}
