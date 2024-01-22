import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { prisma } from '@/repositories/prisma/connection'
import { FindAllUserService } from '@/services/user/FindAll'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function FindAllUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const repository = new PrismaUsersRepository(prisma)

  const service = new FindAllUserService(repository)

  const result = await service.execute()

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(200).send({ users: result.value.users })
}
