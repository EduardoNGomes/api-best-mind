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

  const productResponse = result.value.products.map((product) => {
    const response = {
      ...product,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(product.price),
      createdAt: new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(product.createdAt),
      updatedAt: new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(product.updatedAt),
    }

    return response
  })

  reply.status(200).send({
    products: productResponse,
  })
}
