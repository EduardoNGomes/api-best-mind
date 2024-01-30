import { PrismaProductsRepository } from '@/repositories/prisma/PrismaProductsRepository'
import { prisma } from '@/repositories/prisma/connection'
import { ImageCannotBeSavedError } from '@/services/erros/ImageCannotBeSavedError'
import { ResourceAlreadyExistError } from '@/services/erros/ResourceAlreadyExistError'
import { EditProductService } from '@/services/product/Edit'
import { UploaderMulter } from '@/storage/multer/UploaderMulter'
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

  const filename = request.file?.filename || undefined

  const repository = new PrismaProductsRepository(prisma)
  const uploader = new UploaderMulter()

  const service = new EditProductService(repository, uploader)

  const result = await service.execute({
    id,
    name,
    description,
    price,
    image: filename,
  })

  if (result.isLeft()) {
    if (result.value instanceof ImageCannotBeSavedError) {
      return reply.status(500).send(result.value)
    }

    if (result.value instanceof ResourceAlreadyExistError) {
      return reply.status(409).send(result.value)
    }
  }

  reply.status(200).send()
}
