import { FastifyInstance } from 'fastify'
import { productsRoutes } from '../controlers/products'

export async function Routes(app: FastifyInstance) {
  app.register(productsRoutes)
}
