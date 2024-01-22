import { PrismaProductsRepository } from '@/repositories/prisma/PrismaProductsRepository'
import { prisma } from '@/repositories/prisma/connection'
import { DeleteProductService } from '@/services/product/Delete'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function DeleteProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const DeleteProductBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = DeleteProductBodySchema.parse(request.params)

  const repository = new PrismaProductsRepository(prisma)

  const service = new DeleteProductService(repository)

  const result = await service.execute({
    id,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(200).send()
}
