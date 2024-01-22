import { Users } from '@prisma/client'
import {
  AuthenticateProps,
  AuthenticateRepository,
} from '../AuthenticateRepository'

export class InMemoryAuthenticateRepository implements AuthenticateRepository {
  items: Users[] = []

  async findByEmail({ email }: AuthenticateProps): Promise<Users | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) return null

    return user
  }
}
