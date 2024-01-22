import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { prisma } from '@/repositories/prisma/connection'
import { FindUserByIdService } from '@/services/user/FindById'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function FindUserByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const FindUserByIdBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = FindUserByIdBodySchema.parse(request.params)

  const repository = new PrismaUsersRepository(prisma)

  const service = new FindUserByIdService(repository)

  const result = await service.execute({
    id,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(200).send({ user: { ...result.value.users } })
}
