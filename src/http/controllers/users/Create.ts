import { HasherComparerBcrypt } from '@/cryptography/bcrypt/HasherComparerBcrypt'
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { prisma } from '@/repositories/prisma/connection'
import { CreateUserService } from '@/services/user/Create'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  const repository = new PrismaUsersRepository(prisma)
  const hasher = new HasherComparerBcrypt()

  const service = new CreateUserService(repository, hasher)

  const result = await service.execute({
    name,
    email,
    password,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(201).send()
}
