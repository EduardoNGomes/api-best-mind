import { Users } from '@prisma/client'

export type AuthenticateProps = {
  email: string
}

export abstract class AuthenticateRepository {
  abstract findByEmail({ email }: AuthenticateProps): Promise<Users | null>
}
