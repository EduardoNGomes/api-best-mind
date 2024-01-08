import { PrismaProductsRepository } from '@/repositories/prisma/PrismaProductsRepository'
import { prisma } from '@/repositories/prisma/connection'
import { CreateProductService } from '@/services/product/Create'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateProductController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.coerce.number(),
  })

  const { name, description, price } = createProductBodySchema.parse(
    request.body,
  )

  const repository = new PrismaProductsRepository(prisma)

  const service = new CreateProductService(repository)

  const result = await service.execute({
    name,
    description,
    price,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(201).send()
}
