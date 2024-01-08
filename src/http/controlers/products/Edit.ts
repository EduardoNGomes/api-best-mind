import { PrismaProductsRepository } from '@/repositories/prisma/PrismaProductsRepository'
import { prisma } from '@/repositories/prisma/connection'
import { EditProductService } from '@/services/product/Edit'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function EditProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const EditProductParamsSchema = z.object({
    id: z.string().uuid(),
  })
  const EditProductBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.coerce.number().optional(),
  })

  const { id } = EditProductParamsSchema.parse(request.params)
  const { name, description, price } = EditProductBodySchema.parse(request.body)

  const repository = new PrismaProductsRepository(prisma)

  const service = new EditProductService(repository)

  const result = await service.execute({
    id,
    name,
    description,
    price,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(200).send()
}
