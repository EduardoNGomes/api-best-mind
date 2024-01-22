import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { prisma } from '@/repositories/prisma/connection'
import { DeleteUserService } from '@/services/user/Delete'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function DeleteUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const DeleteUserBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = DeleteUserBodySchema.parse(request.params)

  const repository = new PrismaUsersRepository(prisma)

  const service = new DeleteUserService(repository)

  const result = await service.execute({
    id,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(200).send()
}
