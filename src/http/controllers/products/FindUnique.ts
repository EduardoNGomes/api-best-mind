import { PrismaProductsRepository } from '@/repositories/prisma/PrismaProductsRepository'
import { prisma } from '@/repositories/prisma/connection'
import { FindProductByIdService } from '@/services/product/FindById'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function FindProductByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const FindProductByIdBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = FindProductByIdBodySchema.parse(request.params)

  const repository = new PrismaProductsRepository(prisma)

  const service = new FindProductByIdService(repository)

  const result = await service.execute({
    id,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  const product = {
    id: result.value.products.id,
    name: result.value.products.name,
    description: result.value.products.description,
    image: result.value.products.image,
    price: String(result.value.products.price.toFixed(2)).replace('.', ','),
  }

  reply.status(200).send({
    product,
  })
}
