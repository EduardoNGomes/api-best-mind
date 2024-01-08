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
    price: z.string(),
  })

  const { name, description, price } = createProductBodySchema.parse(
    request.body,
  )

  const repository = new PrismaProductsRepository(prisma)

  const createProductService = new CreateProductService(repository)

  const result = await createProductService.execute({
    name,
    description,
    price,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(201).send()
}
