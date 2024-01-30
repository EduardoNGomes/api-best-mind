import { HasherComparerBcrypt } from '@/cryptography/bcrypt/HasherComparerBcrypt'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'
import { env } from '@/env'
import { PrismaAuthenticateRepository } from '@/repositories/prisma/PrismaAuthenticateRepository'
import { prisma } from '@/repositories/prisma/connection'
import { AuthenticateUserService } from '@/services/authenticate/Authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const repository = new PrismaAuthenticateRepository(prisma)
  const hasher = new HasherComparerBcrypt()
  const encrypter = new EncrypterJWT()

  const service = new AuthenticateUserService(repository, hasher, encrypter)

  const result = await service.execute({
    email,
    password,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  return reply
    .status(201)
    .setCookie('token', result.value.accessToken, {
      domain: env.DOMAIN_COOKIE,
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: `none`,
    })
    .send()
}
