import { PrismaProductsRepository } from '@/repositories/prisma/PrismaProductsRepository'
import { prisma } from '@/repositories/prisma/connection'
import { FindAllProductService } from '@/services/product/FindAll'

import { FastifyReply, FastifyRequest } from 'fastify'

export async function FindAllProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const repository = new PrismaProductsRepository(prisma)

  const service = new FindAllProductService(repository)

  const userId = request.user.sub

  const result = await service.execute({ userId })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(200).send({ products: result.value.products })
}
