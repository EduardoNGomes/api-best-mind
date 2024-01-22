import { HasherComparerBcrypt } from '@/cryptography/bcrypt/HasherComparerBcrypt'
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository'
import { prisma } from '@/repositories/prisma/connection'
import { EditUserService } from '@/services/user/Edit'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function EditUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const EditUserParamsSchema = z.object({
    id: z.string().uuid(),
  })
  const EditUserBodySchema = z.object({
    name: z.string().optional(),
    newEmail: z.string().optional(),
    oldPassword: z.string(),
    newPassword: z.string().optional(),
  })

  const { id } = EditUserParamsSchema.parse(request.params)
  const { name, oldPassword, newEmail, newPassword } = EditUserBodySchema.parse(
    request.body,
  )

  const repository = new PrismaUsersRepository(prisma)
  const hasher = new HasherComparerBcrypt()

  const service = new EditUserService(repository, hasher, hasher)

  const result = await service.execute({
    id,
    name,
    oldPassword,
    newEmail,
    newPassword,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(204).send()
}
