import { FastifyInstance } from 'fastify'
import { CreateProductController } from './Create'

export async function productsRoutes(app: FastifyInstance) {
  app.post('/product', CreateProductController)
}
