import { FastifyInstance } from 'fastify'
import { CreateProductController } from './Create'
import { FindProductByIdController } from './FindUnique'
import { FindAllProductsController } from './FindAll'
import { DeleteProductController } from './Delete'
import { EditProductController } from './Edit'
import multer from 'fastify-multer'
import { MULTER } from '@/config/multer'

const upload = multer(MULTER)

export async function productsRoutes(app: FastifyInstance) {
  app.post(
    '/product',
    { preHandler: upload.single('image') },
    CreateProductController,
  )
  app.get('/product', FindAllProductsController)
  app.get('/product/:id', FindProductByIdController)
  app.delete('/product/:id', DeleteProductController)
  app.put('/product/:id', EditProductController)
}
