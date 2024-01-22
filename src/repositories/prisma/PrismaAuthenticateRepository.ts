import { PrismaClient, Users } from '@prisma/client'

import {
  AuthenticateProps,
  AuthenticateRepository,
} from '../AuthenticateRepository'

export class PrismaAuthenticateRepository implements AuthenticateRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail({ email }: AuthenticateProps): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({ where: { email } })

    return user
  }
}
