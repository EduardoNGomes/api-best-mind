import { PrismaProductsRepository } from '@/repositories/prisma/PrismaProductsRepository'
import { prisma } from '@/repositories/prisma/connection'
import { CreateProductService } from '@/services/product/Create'
import { UploaderMulter } from '@/storage/multer/UploaderMulter'
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
  const createProductFileSchema = z.object({
    filename: z.string(),
  })

  const { name, description, price } = createProductBodySchema.parse(
    request.body,
  )

  const { filename } = createProductFileSchema.parse(request.file)

  const repository = new PrismaProductsRepository(prisma)
  const uploader = new UploaderMulter()

  const service = new CreateProductService(repository, uploader)

  const result = await service.execute({
    name,
    description,
    price,
    image: filename,
  })

  if (result.isLeft()) {
    return reply.status(409).send(result.value)
  }

  reply.status(201).send()
}
