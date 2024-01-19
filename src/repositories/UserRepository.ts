import { Prisma, Users } from '@prisma/client'

export type UserToCreateProps = Prisma.UsersUncheckedCreateInput

export type UserToUpdateProps = {
  id: string
  email?: string
  name?: string
  password?: string
}

export abstract class UserRepository {
  abstract create(data: UserToCreateProps): Promise<void>
  abstract update(data: UserToUpdateProps): Promise<void>
  abstract findById(id: string): Promise<Users | null>
  abstract findByEmail(email: string): Promise<Users | null>
  abstract delete(id: string): Promise<void>
}
